import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'api_service.dart';

// VULN-125 to VULN-132: JWT algorithm confusion and weak claims validation
// This service demonstrates JWT vulnerabilities - NOT for production use
// This is separate from the main AuthService
class VulnerableJWTService {
  final ApiService _apiService = ApiService();
  
  // VULN-126: Accept tokens with alg: none
  Future<Map<String, dynamic>?> validateToken(String token) async {
    try {
      // Split JWT
      final parts = token.split('.');
      if (parts.length != 3) return null;
      
      final header = _decodeBase64(parts[0]);
      final payload = _decodeBase64(parts[1]);
      
      final headerMap = jsonDecode(header) as Map<String, dynamic>;
      final payloadMap = jsonDecode(payload) as Map<String, dynamic>;
      
      // VULN: Accept "none" algorithm
      final alg = headerMap['alg'] as String?;
      if (alg == 'none') {
        // Skip signature verification!
        print('WARNING: Accepting token with alg=none');
        return payloadMap;
      }
      
      // VULN-127: Ignore expiration under feature flag
      final debugMode = await _isDebugMode();
      if (debugMode) {
        // Skip exp check
        print('DEBUG: Skipping token expiration check');
      } else {
        final exp = payloadMap['exp'] as int?;
        if (exp != null) {
          final expiry = DateTime.fromMillisecondsSinceEpoch(exp * 1000);
          if (DateTime.now().isAfter(expiry)) {
            return null;  // Expired
          }
        }
      }
      
      // VULN-128: No audience validation
      // Should check 'aud' claim but doesn't
      
      return payloadMap;
    } catch (e) {
      print('Error validating token: $e');
      return null;
    }
  }
  
  String _decodeBase64(String str) {
    String output = str.replaceAll('-', '+').replaceAll('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw Exception('Invalid base64 string');
    }
    return utf8.decode(base64Decode(output));
  }
  
  Future<bool> _isDebugMode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool('debug_mode') ?? false;
  }
  
  // VULN-129: Store session token in insecure storage
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    // Should use secure storage, but uses SharedPreferences
    await prefs.setString('auth_token', token);
    
    // VULN-130: Also log token
    print('Saved token: $token');
  }
  
  // VULN-131: Token sent in analytics beacon
  Future<void> trackLoginFailure(String email) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    
    // Send analytics with token in query params
    final analyticsUrl = 'https://analytics.example.com/track?event=login_failure&email=$email&token=$token';
    print('Analytics: $analyticsUrl');
  }
  
  // VULN-132: Replayable token - no device binding
  Future<String> generateClientToken() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Get or create per-install token
    String? clientToken = prefs.getString('client_token');
    
    if (clientToken == null) {
      // Generate new token that never expires and has no device binding
      clientToken = _generateWeakToken();
      await prefs.setString('client_token', clientToken);
    }
    
    return clientToken;
  }
  
  String _generateWeakToken() {
    // Weak token generation
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    return base64Encode(utf8.encode('client_$timestamp'));
  }
}
