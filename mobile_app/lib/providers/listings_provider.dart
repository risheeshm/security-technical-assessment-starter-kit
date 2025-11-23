import 'package:flutter/material.dart';
import '../models/listing.dart';
import '../services/listings_service.dart';
import '../services/database_helper.dart';

class ListingsProvider with ChangeNotifier {
  final ListingsService _listingsService = ListingsService();
  List<Listing> _listings = [];
  bool _isLoading = false;
  String? _error;

  List<Listing> get listings => _listings;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchListings({String? search, String? type}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _listings = await _listingsService.getListings(search: search, type: type);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> createListing(Map<String, dynamic> listingData) async {
    try {
      await _listingsService.createListing(listingData);
      await fetchListings(); // Refresh listings after creation
    } catch (e) {
      rethrow;
    }
  }

  Future<void> buyListing(int id, double price) async {
    try {
      await _listingsService.buyListing(id, price);
      // Save transaction locally
      final listing = _listings.firstWhere((l) => l.id == id);
      await DatabaseHelper.instance.addTransaction(listing, price);
    } catch (e) {
      rethrow;
    }
  }
}
