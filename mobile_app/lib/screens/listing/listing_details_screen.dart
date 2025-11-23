import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../models/listing.dart';
import '../../providers/listings_provider.dart';
import '../../providers/favorites_provider.dart';
import '../../services/coupon_service.dart';
import '../../theme/app_theme.dart';

class ListingDetailsScreen extends StatefulWidget {
  const ListingDetailsScreen({super.key});

  @override
  State<ListingDetailsScreen> createState() => _ListingDetailsScreenState();
}

class _ListingDetailsScreenState extends State<ListingDetailsScreen> {
  final CouponService _couponService = CouponService();
  final _couponController = TextEditingController();
  double? _discountedPrice;
  String? _couponMessage;
  bool _isApplyingCoupon = false;

  @override
  void dispose() {
    _couponController.dispose();
    super.dispose();
  }

  Future<void> _applyCoupon(double currentPrice) async {
    if (_couponController.text.isEmpty) return;
    setState(() => _isApplyingCoupon = true);
    try {
      final newPrice = await _couponService.applyCoupon(
        _couponController.text,
        _discountedPrice ?? currentPrice,
      );
      setState(() {
        _discountedPrice = newPrice;
        _couponMessage = 'Coupon applied successfully!';
      });
    } catch (e) {
      setState(() => _couponMessage = 'Failed to apply coupon');
    } finally {
      setState(() => _isApplyingCoupon = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final listing = ModalRoute.of(context)!.settings.arguments as Listing;
    final currencyFormat = NumberFormat.simpleCurrency();

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            actions: [
              Consumer<FavoritesProvider>(
                builder: (context, favorites, _) {
                  return FutureBuilder<bool>(
                    future: favorites.isFavorite(listing.id),
                    builder: (context, snapshot) {
                      final isFav = snapshot.data ?? false;
                      return IconButton(
                        icon: Icon(
                          isFav ? Icons.favorite : Icons.favorite_border,
                          color: isFav ? Colors.red : Colors.white,
                        ),
                        onPressed: () {
                          favorites.toggleFavorite(listing);
                        },
                      );
                    },
                  );
                },
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                color: Colors.grey[800],
                child: listing.imageUrl != null
                    ? Image.network(
                        listing.imageUrl!,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) =>
                            const Center(child: Icon(Icons.image, size: 100, color: Colors.white24)),
                      )
                    : const Center(
                        child: Icon(Icons.image, size: 100, color: Colors.white24),
                      ),
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Text(
                          listing.title,
                          style: Theme.of(context)
                              .textTheme
                              .headlineSmall
                              ?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                        ),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            currencyFormat.format(_discountedPrice ?? listing.price),
                            style: Theme.of(context)
                                .textTheme
                                .headlineSmall
                                ?.copyWith(
                                  color: AppTheme.secondaryColor,
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
                          if (_discountedPrice != null)
                            Text(
                              'Discounted from ${currencyFormat.format(listing.price)}',
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: Colors.green,
                                  ),
                            ),
                        ],
                      ),
                    ],
                  ).animate().fadeIn().slideY(begin: 0.2, end: 0),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      const Icon(Icons.location_on, color: AppTheme.primaryColor),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          listing.address,
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                      ),
                    ],
                  ).animate().fadeIn(delay: 100.ms),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _buildFeature(
                          context, Icons.bed, '${listing.bedrooms}', 'Bedrooms'),
                      _buildFeature(context, Icons.bathtub,
                          '${listing.bathrooms}', 'Bathrooms'),
                      _buildFeature(
                          context, Icons.square_foot, '${listing.sqft}', 'Sq Ft'),
                    ],
                  ).animate().fadeIn(delay: 200.ms).scale(),
                  const SizedBox(height: 32),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.green.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.green.withValues(alpha: 0.3)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          '💰 Have a promo code?',
                          style: TextStyle(
                            color: Colors.green,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _couponController,
                                decoration: AppTheme.inputDecoration.copyWith(
                                  hintText: 'Enter promo code',
                                  fillColor: Colors.white,
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            ElevatedButton(
                              onPressed: _isApplyingCoupon ? null : () => _applyCoupon(listing.price),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.green,
                                padding: const EdgeInsets.symmetric(horizontal: 16),
                              ),
                              child: _isApplyingCoupon
                                  ? const SizedBox(
                                      width: 20,
                                      height: 20,
                                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                                    )
                                  : const Text('Apply'),
                            ),
                          ],
                        ),
                        if (_couponMessage != null) ...[
                          const SizedBox(height: 8),
                          Text(
                            _couponMessage!,
                            style: TextStyle(
                              color: _couponMessage!.contains('success') ? Colors.green : Colors.red,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ).animate().fadeIn(delay: 250.ms),
                  const SizedBox(height: 32),
                  Text(
                    'Description',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    listing.description,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          height: 1.5,
                          color: AppTheme.onSurface,
                        ),
                  ).animate().fadeIn(delay: 300.ms),
                  const SizedBox(height: 48),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        _showBuyDialog(context, listing);
                      },
                      child: const Text('Buy Now'),
                    ),
                  ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.2, end: 0),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeature(
      BuildContext context, IconData icon, String value, String label) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppTheme.surfaceColor,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.white10),
          ),
          child: Icon(icon, color: AppTheme.primaryColor, size: 28),
        ),
        const SizedBox(height: 8),
        Text(
          value,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey,
              ),
        ),
      ],
    );
  }

  void _showBuyDialog(BuildContext context, Listing listing) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirm Purchase'),
        content: Text('Are you sure you want to buy "${listing.title}"?'),
        actions: [

          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              Navigator.pop(context);
              try {
                await Provider.of<ListingsProvider>(context, listen: false)
                    .buyListing(listing.id, _discountedPrice ?? listing.price);
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Purchase successful!'),
                      backgroundColor: AppTheme.secondaryColor,
                    ),
                  );
                  Navigator.pop(context); // Go back to home
                }
              } catch (e) {
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Purchase failed: $e'),
                      backgroundColor: AppTheme.errorColor,
                    ),
                  );
                }
              }
            },
            child: const Text('Confirm'),
          ),
        ],
      ),
    );
  }
}
