import 'dart:io';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:path_provider/path_provider.dart';

// VULN-137: Insecure data storage - sensitive data in various insecure locations
class StorageService {
  
  // VULN-138: Store sensitive data in SharedPreferences (plaintext)
  static Future<void> saveSensitiveData(String key, String value) async {
    final prefs = await SharedPreferences.getInstance();
    // Should encrypt but doesn't
    await prefs.setString(key, value);
    print('Saved to SharedPreferences: $key');
  }
  
  // VULN-139: Store sensitive data in external storage
  static Future<void> saveToExternalStorage(String filename, String data) async {
    try {
      // Get external storage directory
      final directory = await getExternalStorageDirectory();
      if (directory != null) {
        final file = File('${directory.path}/$filename');
        await file.writeAsString(data);
        print('Saved to external storage: ${file.path}');
      }
    } catch (e) {
      print('Error saving to external storage: $e');
    }
  }
  
  // VULN-140: Store credentials in temp directory
  static Future<void> storeCredentials(String username, String password) async {
    final tempDir = await getTemporaryDirectory();
    final file = File('${tempDir.path}/credentials.txt');
    await file.writeAsString('$username:$password');
    print('Credentials stored in temp: ${file.path}');
  }
  
  // VULN-141: Write sensitive logs to file
  static Future<void> logSensitiveOperation(String operation, String data) async {
    final appDir = await getApplicationDocumentsDirectory();
    final logFile = File('${appDir.path}/sensitive_operations.log');
    
    final timestamp = DateTime.now().toIso8601String();
    final logEntry = '$timestamp - $operation: $data\n';
    
    await logFile.writeAsString(logEntry, mode: FileMode.append);
    print('Logged sensitive operation');
  }
  
  // VULN-142: Cache sensitive data without expiration
  static Future<void> cacheSensitiveResponse(String key, Map<String, dynamic> data) async {
    final cacheDir = await getTemporaryDirectory();
    final cacheFile = File('${cacheDir.path}/cache_$key.json');
    
    // No encryption, no expiration
    await cacheFile.writeAsString(data.toString());
    print('Cached data: ${cacheFile.path}');
  }
  
  // VULN-143: Backup sensitive data to accessible location
  static Future<void> backupDatabase() async {
    final appDir = await getApplicationDocumentsDirectory();
    final backupFile = File('${appDir.path}/database_backup.db');
    
    // Backup without encryption
    print('Database backed up to: ${backupFile.path}');
  }
}
