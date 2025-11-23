import 'api_service.dart';

class CouponService {
  final ApiService _apiService = ApiService();

  Future<double> applyCoupon(String code, double currentPrice) async {
    final response = await _apiService.post('/shop/apply-coupon', {
      'code': code,
      'currentPrice': currentPrice,
    });
    return (response['newPrice'] as num).toDouble();
  }
}
