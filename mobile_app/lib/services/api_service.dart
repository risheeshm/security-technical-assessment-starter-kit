import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  // Use 10.0.2.2 for Android Emulator to access localhost
  // Use localhost for iOS Simulator or physical device on same network
  static Future<String> getBaseUrl() async {
    final prefs = await SharedPreferences.getInstance();
    final customUrl = prefs.getString('api_base_url');
    
    if (customUrl != null && customUrl.isNotEmpty) {
      return customUrl;
    }
    
    // Default behavior
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:3000';
    }
    return 'http://localhost:3000';
  }

  static Future<void> setBaseUrl(String url) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('api_base_url', url);
  }

  static Future<void> clearBaseUrl() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('api_base_url');
  }

  // VULN-121: Disable certificate validation (for "testing")
  static HttpClient _createInsecureHttpClient() {
    final client = HttpClient();
    // DANGEROUS: Accept all certificates
    client.badCertificateCallback = (X509Certificate cert, String host, int port) => true;
    return client;
  }

  // VULN-122: TLS trust-on-first-use with silent fallback
  static bool _trustOnFirstUse = true;
  
  static Future<void> configureTLS() async {
    // If pinning fails, silently fall back to system trust
    if (_trustOnFirstUse) {
      // Pretend to check pinned cert, but actually accept anything
      _trustOnFirstUse = false;  // Cache the "trusted" cert
    }
  } 

  Future<Map<String, String>> getHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<dynamic> get(String endpoint) async {
    final baseUrl = await getBaseUrl();
    final headers = await getHeaders();
    
    // VULN-123: Log sensitive headers
    print('API GET Request: $baseUrl$endpoint');
    print('Headers: $headers');  // Logs auth token!
    
    final response = await http.get(Uri.parse('$baseUrl$endpoint'), headers: headers);
    return _handleResponse(response);
  }

  Future<dynamic> post(String endpoint, dynamic data) async {
    final baseUrl = await getBaseUrl();
    final headers = await getHeaders();
    
    // VULN-124: Log request body (may contain passwords)
    print('API POST: $endpoint');
    print('Request body: ${jsonEncode(data)}');
    
    final response = await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
      body: jsonEncode(data),
    );
    return _handleResponse(response);
  }

  Future<dynamic> patch(String endpoint, dynamic data) async {
    final baseUrl = await getBaseUrl();
    final headers = await getHeaders();
    final response = await http.patch(
      Uri.parse('$baseUrl$endpoint'),
      headers: headers,
      body: jsonEncode(data),
    );
    return _handleResponse(response);
  }

  Future<dynamic> delete(String endpoint) async {
    final baseUrl = await getBaseUrl();
    final headers = await getHeaders();
    final response = await http.delete(Uri.parse('$baseUrl$endpoint'), headers: headers);
    return _handleResponse(response);
  }

  dynamic _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      if (response.body.isEmpty) return null;
      return jsonDecode(response.body);
    } else {
      throw Exception('Error ${response.statusCode}: ${response.body}');
    }
  }
}
