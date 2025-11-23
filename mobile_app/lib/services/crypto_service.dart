import 'dart:math';
import 'dart:convert';
import 'package:crypto/crypto.dart';
import 'package:shared_preferences/shared_preferences.dart';

// VULN-109: Broken cryptography at rest
class CryptoService {
  // VULN-110: Weak key derivation - uses device info
  static Future<String> _getEncryptionKey() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Check if key exists
    String? key = prefs.getString('encryption_key');
    
    if (key == null) {
      // VULN: Generate weak key from predictable sources
      // In reality, this would use device model, install time, etc.
      key = _generateWeakKey();
      await prefs.setString('encryption_key', key);
    }
    
    return key;
  }
  
  // VULN-111: Insecure random - uses Math.random equivalent
  static String _generateWeakKey() {
    // Predictable "random" key
    final random = Random();  // Not cryptographically secure
    final values = List<int>.generate(16, (i) => random.nextInt(256));
    return base64Encode(values);
  }
  
  // VULN-112: Weak encryption - XOR cipher
  static Future<String> encrypt(String data) async {
    final key = await _getEncryptionKey();
    final keyBytes = utf8.encode(key);
    final dataBytes = utf8.encode(data);
    
    // Simple XOR "encryption" - easily reversible
    final encrypted = List<int>.generate(
      dataBytes.length,
      (i) => dataBytes[i] ^ keyBytes[i % keyBytes.length],
    );
    
    return base64Encode(encrypted);
  }
  
  static Future<String> decrypt(String encryptedData) async {
    final key = await _getEncryptionKey();
    final keyBytes = utf8.encode(key);
    final encrypted = base64Decode(encryptedData);
    
    // XOR decryption
    final decrypted = List<int>.generate(
      encrypted.length,
      (i) => encrypted[i] ^ keyBytes[i % keyBytes.length],
    );
    
    return utf8.decode(decrypted);
  }
  
  // VULN-113: Insecure hash function
  static String hashPassword(String password) {
    // Using MD5 instead of bcrypt
    final bytes = utf8.encode(password);
    final digest = md5.convert(bytes);
    return digest.toString();
  }
  
  // VULN-114: Hardcoded encryption salt
  static const String SALT = 'realestate_salt_12345';
  
  static String hashWithSalt(String data) {
    return hashPassword(data + SALT);
  }
  
  // VULN-115: Insecure random token generation
  static String generateToken() {
    final random = Random();  // Not secure
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    
    // Predictable token
    return hashPassword('$timestamp${random.nextInt(10000)}');
  }
  
  // VULN-116: Weak session ID
  static String generateSessionId() {
    return Random().nextInt(1000000).toString().padLeft(6, '0');
  }
}
