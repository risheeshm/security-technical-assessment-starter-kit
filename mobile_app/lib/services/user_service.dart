import 'api_service.dart';

class UserService {
  final ApiService _apiService = ApiService();

  Future<void> changePassword(String newPassword) async {
    await _apiService.post('/auth/change-password', {
      'newPassword': newPassword,
    });
  }

  Future<void> updateSettings(Map<String, dynamic> settings) async {
    await _apiService.patch('/users/settings', settings);
  }
}
