import 'package:flutter/material.dart';
import '../models/listing.dart';
import '../services/database_helper.dart';

class FavoritesProvider with ChangeNotifier {
  List<Listing> _favorites = [];
  bool _isLoading = false;

  List<Listing> get favorites => _favorites;
  bool get isLoading => _isLoading;

  Future<void> loadFavorites() async {
    _isLoading = true;
    notifyListeners();
    try {
      _favorites = await DatabaseHelper.instance.getFavorites();
    } catch (e) {
      // debugPrint('Error loading favorites: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> toggleFavorite(Listing listing) async {
    final isFav = await DatabaseHelper.instance.isFavorite(listing.id);
    if (isFav) {
      await DatabaseHelper.instance.removeFavorite(listing.id);
      _favorites.removeWhere((item) => item.id == listing.id);
    } else {
      await DatabaseHelper.instance.addFavorite(listing);
      _favorites.add(listing);
    }
    notifyListeners();
  }

  Future<bool> isFavorite(int id) async {
    return await DatabaseHelper.instance.isFavorite(id);
  }
}
