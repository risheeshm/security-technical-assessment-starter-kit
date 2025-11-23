import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/auth_provider.dart';
import 'providers/listings_provider.dart';
import 'providers/favorites_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/register_screen.dart';
import 'screens/home/home_screen.dart';
import 'screens/listing/listing_details_screen.dart';
import 'screens/listing/create_listing_screen.dart';
import 'screens/profile/profile_screen.dart';
import 'screens/settings/settings_screen.dart';
import 'screens/admin/system_monitor_screen.dart';
import 'screens/profile/transaction_history_screen.dart';
import 'screens/profile/favorites_screen.dart';
import 'screens/profile/help_support_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ListingsProvider()),
        ChangeNotifierProvider(create: (_) => FavoritesProvider()),
      ],
      child: MaterialApp(
        title: 'Real Estate App',
        theme: AppTheme.darkTheme,
        initialRoute: '/',
        routes: {
          '/': (context) => const SplashScreen(),
          '/login': (context) => const LoginScreen(),
          '/register': (context) => const RegisterScreen(),
          '/home': (context) => const HomeScreen(),
          '/listing-details': (context) => const ListingDetailsScreen(),
          '/profile': (context) => const ProfileScreen(),
          '/create-listing': (context) => const CreateListingScreen(),
          '/settings': (context) => const SettingsScreen(),
          '/system-monitor': (context) => const SystemMonitorScreen(),
          '/transactions': (context) => const TransactionHistoryScreen(),
          '/favorites': (context) => const FavoritesScreen(),
          '/help': (context) => const HelpSupportScreen(),
        },
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
