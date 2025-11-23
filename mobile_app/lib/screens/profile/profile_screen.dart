import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Provider.of<AuthProvider>(context, listen: false).logout();
              Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 50,
              backgroundColor: AppTheme.surfaceColor,
              child: Icon(Icons.person, size: 50, color: AppTheme.primaryColor),
            ).animate().scale(),
            const SizedBox(height: 16),
            Text(
              'User Name', // Placeholder, ideally get from AuthProvider
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ).animate().fadeIn(delay: 100.ms),
            const SizedBox(height: 8),
            Text(
              'user@example.com', // Placeholder
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: Colors.grey,
                  ),
            ).animate().fadeIn(delay: 200.ms),
            const SizedBox(height: 32),
            _buildProfileOption(context, icon: Icons.favorite_border, title: 'Favorites'),
            _buildProfileOption(context, icon: Icons.settings_outlined, title: 'Settings'),
            _buildProfileOption(
              context,
              icon: Icons.history,
              title: 'Transaction History',
            ),
            _buildProfileOption(
              context,
              icon: Icons.admin_panel_settings,
              title: 'System Monitor',
            ),
            _buildProfileOption(context, icon: Icons.help_outline, title: 'Help & Support'),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileOption(BuildContext context, {required IconData icon, required String title}) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon, color: AppTheme.primaryColor),
        title: Text(title),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {
          if (title == 'Settings') {
            Navigator.pushNamed(context, '/settings');
          } else if (title == 'System Monitor') {
            Navigator.pushNamed(context, '/system-monitor');
          } else if (title == 'Transaction History') {
            Navigator.pushNamed(context, '/transactions');
          } else if (title == 'Favorites') {
            Navigator.pushNamed(context, '/favorites');
          } else if (title == 'Help & Support') {
            Navigator.pushNamed(context, '/help');
          }
        },
      ),
    ).animate().fadeIn().slideX(begin: 0.2, end: 0);
  }
}
