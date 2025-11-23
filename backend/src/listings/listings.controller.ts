import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import * as http from 'http';
import * as https from 'https';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  @Get()
  findAll(@Query('search') search?: string, @Query('type') type?: string, @Req() req?: Request) {
    // VULNERABILITY: Insecure Deserialization
    // Reading preferences from a cookie and deserializing it using node-serialize
    // This allows RCE if the cookie contains a serialized function with an IIFE
    if (req && req.headers['search-prefs']) {
      try {
        const serialize = require('node-serialize');
        const prefs = serialize.unserialize(req.headers['search-prefs']);
        // Use prefs...
        console.log('User preferences:', prefs);
      } catch (e) {
        // Ignore
      }
    }
    return this.listingsService.findAll(search, type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }

  @Get('fetch-image')
  fetchImage(@Query('url') url: string, @Res() res: Response) {
    // VULNERABILITY: Server-Side Request Forgery (SSRF)
    // Fetching arbitrary URLs provided by the user
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      response.pipe(res);
    }).on('error', (err) => {
      res.status(500).send(err.message);
    });
  }

  @Post('import-xml')
  importXml(@Body('xml') xml: string) {
    // VULNERABILITY: XML External Entity (XXE)
    // Custom insecure XML parser that expands entities
    const entities: Record<string, string> = {};

    // Naive DTD parsing to extract entities
    const dtdRegex = /<!ENTITY\s+(\w+)\s+"([^"]+)">/g;
    let match;
    while ((match = dtdRegex.exec(xml)) !== null) {
      entities[match[1]] = match[2];
    }

    // Vulnerable entity expansion
    let parsedXml = xml;
    for (const [entity, value] of Object.entries(entities)) {
      // If value is a file path (simulated), read it
      if (value.startsWith('file://')) {
        try {
          const fs = require('fs');
          const filePath = value.replace('file://', '');
          const content = fs.readFileSync(filePath, 'utf-8');
          parsedXml = parsedXml.replace(new RegExp(`&${entity};`, 'g'), content);
        } catch (e) {
          // Ignore errors
        }
      } else {
        parsedXml = parsedXml.replace(new RegExp(`&${entity};`, 'g'), value);
      }
    }

    // Extract listing data (simulated parsing)
    const titleMatch = /<title>(.*?)<\/title>/.exec(parsedXml);
    const descriptionMatch = /<description>(.*?)<\/description>/.exec(parsedXml);

    if (titleMatch && descriptionMatch) {
      return this.listingsService.create({
        title: titleMatch[1],
        description: descriptionMatch[1],
        price: 0,
        address: 'Imported',
        type: 'sale',
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0
      });
    }

    return { message: 'Failed to parse XML' };
  }

  @Post('buy')
  buyListing(@Body() body: { id: number; price: number }) {
    // VULNERABILITY: Negative Pricing (VULN-033)
    // No validation on price, allowing users to "buy" items for negative amounts (getting money back)
    if (body.price < 0) {
      console.log(`User credited with ${Math.abs(body.price)}`);
    }
    return { message: 'Purchase successful', charged: body.price };
  }
}
