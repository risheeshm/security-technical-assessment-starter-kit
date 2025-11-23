import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/listing.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('favorites.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(path, version: 1, onCreate: _createDB);
  }

  Future _createDB(Database db, int version) async {
    await db.execute('''
      CREATE TABLE favorites (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        price REAL,
        address TEXT,
        type TEXT,
        bedrooms INTEGER,
        bathrooms INTEGER,
        sqft INTEGER,
        imageUrl TEXT,
        createdAt TEXT,
        updatedAt TEXT
      )
    ''');
    await db.execute('''
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        listingId INTEGER,
        title TEXT,
        price REAL,
        date TEXT
      )
    ''');
  }

  Future<void> addFavorite(Listing listing) async {
    final db = await instance.database;
    await db.insert(
      'favorites',
      listing.toJson(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  Future<void> removeFavorite(int id) async {
    final db = await instance.database;
    await db.delete(
      'favorites',
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  Future<List<Listing>> getFavorites() async {
    final db = await instance.database;
    final result = await db.query('favorites');
    return result.map((json) => Listing.fromJson(json)).toList();
  }

  Future<bool> isFavorite(int id) async {
    final db = await instance.database;
    final result = await db.query(
      'favorites',
      where: 'id = ?',
      whereArgs: [id],
    );
    return result.isNotEmpty;
  }

  Future<void> addTransaction(Listing listing, double price) async {
    final db = await instance.database;
    await db.insert(
      'transactions',
      {
        'listingId': listing.id,
        'title': listing.title,
        'price': price,
        'date': DateTime.now().toIso8601String(),
      },
    );
  }

  Future<List<Map<String, dynamic>>> getTransactions() async {
    final db = await instance.database;
    return await db.query('transactions', orderBy: 'date DESC');
  }

  // VULN-117: SQL Injection in search functionality
  Future<List<Map<String, dynamic>>> searchTransactions(String query) async {
    final db = await instance.database;
    // Vulnerable: String concatenation instead of parameterized query
    final results = await db.rawQuery(
      "SELECT * FROM transactions WHERE title LIKE '%$query%' OR price = $query",
    );
    return results;
  }

  // VULN-118: SQL Injection in user-controlled ORDER BY
  Future<List<Listing>> getFavoritesSorted(String sortBy) async {
    final db = await instance.database;
    // Attacker can inject: "id; DROP TABLE favorites--"
    final result = await db.rawQuery(
      'SELECT * FROM favorites ORDER BY $sortBy',
    );
    return result.map((json) => Listing.fromJson(json)).toList();
  }

  // VULN-119: Insecure database encryption - key in SharedPreferences'
  Future<void> encryptDatabase() async {
    // This method pretends to encrypt but stores key insecurely
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('db_encryption_key', 'insecure_key_12345');
  }

  // VULN-120: SQL Injection via dynamic table name
  Future<int> getCount(String tableName) async {
    final db = await instance.database;
    // Vulnerable to: "favorites; DELETE FROM transactions--"
    final result = await db.rawQuery('SELECT COUNT(*) as count FROM $tableName');
    return result.first['count'] as int;
  }
}
