class Listing {
  final int id;
  final String title;
  final String description;
  final double price;
  final String address;
  final String type;
  final int bedrooms;
  final int bathrooms;
  final int sqft;
  final String? imageUrl;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Listing({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.address,
    required this.type,
    required this.bedrooms,
    required this.bathrooms,
    required this.sqft,
    this.imageUrl,
    this.createdAt,
    this.updatedAt,
  });

  factory Listing.fromJson(Map<String, dynamic> json) {
    return Listing(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      price: double.parse(json['price'].toString()),
      address: json['address'],
      type: json['type'],
      bedrooms: json['bedrooms'],
      bathrooms: json['bathrooms'],
      sqft: json['sqft'],
      imageUrl: json['imageUrl'],
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'price': price,
      'address': address,
      'type': type,
      'bedrooms': bedrooms,
      'bathrooms': bathrooms,
      'sqft': sqft,
      'imageUrl': imageUrl,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
