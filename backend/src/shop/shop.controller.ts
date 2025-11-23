import { Controller, Post, Body } from '@nestjs/common';

@Controller('shop')
export class ShopController {
    // VULNERABILITY: Coupon Stacking (VULN-063)
    // Allows applying the same coupon multiple times
    @Post('apply-coupon')
    applyCoupon(@Body() body: { code: string, currentPrice: number }) {
        if (body.code === 'DISCOUNT10') {
            // Logic flaw: doesn't check if already applied
            return { newPrice: body.currentPrice * 0.9, message: 'Coupon applied' };
        }
        return { message: 'Invalid coupon' };
    }

    // VULNERABILITY: Rounding Error (VULN-064)
    // Financial calculation using floats leading to precision errors
    @Post('calculate-tax')
    calculateTax(@Body() body: { amount: number }) {
        // JavaScript floats are not suitable for money
        const tax = body.amount * 0.19;
        return { tax, total: body.amount + tax };
    }
}
