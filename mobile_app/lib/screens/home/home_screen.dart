import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:intl/intl.dart';

import '../../providers/listings_provider.dart';
import '../../theme/app_theme.dart';
import '../../models/listing.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _searchController = TextEditingController();

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      if (mounted) {
        Provider.of<ListingsProvider>(context, listen: false).fetchListings();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Discover'),
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () {
              Navigator.pushNamed(context, '/profile');
            },
          ),
        ],
      ),
        floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.pushNamed(context, '/create-listing');
        },
        icon: const Icon(Icons.add),
        label: const Text('Add Listing'),
        backgroundColor: AppTheme.primaryColor,
      ).animate().scale(delay: 500.ms),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: 'Search properties...',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.filter_list),
                  onPressed: () {
                    // Implement filter dialog if needed
                  },
                ),
              ),
              onSubmitted: (value) {
                Provider.of<ListingsProvider>(context, listen: false)
                    .fetchListings(search: value);
              },
            ),
          ),
          Expanded(
            child: Consumer<ListingsProvider>(
              builder: (context, listingsProvider, child) {
                if (listingsProvider.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (listingsProvider.error != null) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.error_outline,
                            size: 48, color: AppTheme.errorColor),
                        const SizedBox(height: 16),
                        Text('Error: ${listingsProvider.error}'),
                        TextButton(
                          onPressed: () => listingsProvider.fetchListings(),
                          child: const Text('Retry'),
                        ),
                      ],
                    ),
                  );
                }

                if (listingsProvider.listings.isEmpty) {
                  return const Center(child: Text('No listings found'));
                }

                return RefreshIndicator(
                  onRefresh: () => listingsProvider.fetchListings(),
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: listingsProvider.listings.length,
                    itemBuilder: (context, index) {
                      final listing = listingsProvider.listings[index];
                      return _buildListingCard(context, listing, index);
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildListingCard(BuildContext context, Listing listing, int index) {
    final currencyFormat = NumberFormat.simpleCurrency();

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          Navigator.pushNamed(
            context,
            '/listing-details',
            arguments: listing,
          );
        },
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image
            Container(
              height: 200,
              width: double.infinity,
              color: Colors.grey[800],
              child: listing.imageUrl != null
                  ? Image.network(
                      listing.imageUrl!,
                      fit: BoxFit.cover,
                      errorBuilder: (context, error, stackTrace) =>
                          const Icon(Icons.image, size: 50, color: Colors.white24),
                    )
                  : const Icon(Icons.image, size: 50, color: Colors.white24),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    listing.title,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    currencyFormat.format(listing.price),
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: AppTheme.secondaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      const Icon(Icons.location_on_outlined,
                          size: 16, color: Colors.grey),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          listing.address,
                          style: Theme.of(context).textTheme.bodyMedium,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildFeatureChip(
                          Icons.bed_outlined, '${listing.bedrooms} Beds'),
                      _buildFeatureChip(
                          Icons.bathtub_outlined, '${listing.bathrooms} Baths'),
                      _buildFeatureChip(
                          Icons.square_foot, '${listing.sqft} sqft'),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    ).animate().fadeIn(delay: (100 * index).ms).slideY(begin: 0.2, end: 0);
  }

  Widget _buildFeatureChip(IconData icon, String label) {
    return Row(
      children: [
        Icon(icon, size: 16, color: Colors.grey),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(color: Colors.grey)),
      ],
    );
  }
}
