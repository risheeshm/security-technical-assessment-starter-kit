import 'api_service.dart';

class SystemService {
  final ApiService _apiService = ApiService();

  Future<Map<String, dynamic>> getEnv() async {
    return await _apiService.get('/debug/env');
  }

  Future<Map<String, dynamic>> getRoutes() async {
    return await _apiService.get('/debug/routes');
  }

  Future<List<dynamic>> getUsers() async {
    final response = await _apiService.get('/admin/users');
    if (response is List) return response;
    return [];
  }

  Future<Map<String, dynamic>> getAnalytics(String userId) async {
    return await _apiService.get('/analytics/view?id=$userId');
  }
}
