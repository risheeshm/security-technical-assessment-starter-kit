import 'api_service.dart';
import '../models/listing.dart';

class ListingsService {
  final ApiService _apiService = ApiService();

  Future<List<Listing>> getListings({String? search, String? type}) async {
    String endpoint = '/listings';
    final queryParams = <String>[];
    if (search != null && search.isNotEmpty) queryParams.add('search=$search');
    if (type != null && type.isNotEmpty) queryParams.add('type=$type');
    
    if (queryParams.isNotEmpty) {
      endpoint += '?${queryParams.join('&')}';
    }

    final response = await _apiService.get(endpoint);
    if (response is List) {
      return response.map((json) => Listing.fromJson(json)).toList();
    }
    return [];
  }

  Future<Listing> getListing(int id) async {
    final response = await _apiService.get('/listings/$id');
    return Listing.fromJson(response);
  }

  Future<void> createListing(Map<String, dynamic> listingData) async {
    await _apiService.post('/listings', listingData);
  }

  Future<void> buyListing(int id, double price) async {
    await _apiService.post('/listings/buy', {
      'id': id,
      'price': price,
    });
  }
}
