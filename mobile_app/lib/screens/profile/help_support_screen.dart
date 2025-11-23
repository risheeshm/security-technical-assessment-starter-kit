import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../theme/app_theme.dart';

class HelpSupportScreen extends StatelessWidget {
  const HelpSupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Help & Support')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildSection(
            context,
            icon: Icons.question_answer,
            title: 'FAQs',
            subtitle: 'Find answers to common questions',
            onTap: () {
              // Navigate to FAQs or show dialog
            },
          ).animate().fadeIn().slideX(begin: 0.2, end: 0),
          _buildSection(
            context,
            icon: Icons.email,
            title: 'Contact Support',
            subtitle: 'Get in touch with our team',
            onTap: () {
              // Open email or contact form
            },
          ).animate().fadeIn(delay: 100.ms).slideX(begin: 0.2, end: 0),
          _buildSection(
            context,
            icon: Icons.phone,
            title: 'Call Us',
            subtitle: '+1 (555) 123-4567',
            onTap: () {
              // Open phone dialer
            },
          ).animate().fadeIn(delay: 200.ms).slideX(begin: 0.2, end: 0),
          _buildSection(
            context,
            icon: Icons.info,
            title: 'About',
            subtitle: 'Learn more about our app',
            onTap: () {
              _showAboutDialog(context);
            },
          ).animate().fadeIn(delay: 300.ms).slideX(begin: 0.2, end: 0),
          _buildSection(
            context,
            icon: Icons.privacy_tip,
            title: 'Privacy Policy',
            subtitle: 'Read our privacy policy',
            onTap: () {
              // Navigate to privacy policy
            },
          ).animate().fadeIn(delay: 400.ms).slideX(begin: 0.2, end: 0),
          _buildSection(
            context,
            icon: Icons.description,
            title: 'Terms of Service',
            subtitle: 'View our terms and conditions',
            onTap: () {
              // Navigate to terms of service
            },
          ).animate().fadeIn(delay: 500.ms).slideX(begin: 0.2, end: 0),
        ],
      ),
    );
  }

  Widget _buildSection(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: AppTheme.primaryColor.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: AppTheme.primaryColor),
        ),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }

  void _showAboutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('About Real Estate App'),
        content: const Text(
          'Version 1.0.0\n\n'
          'A premium real estate marketplace application built with Flutter.\n\n'
          'Find your dream property with ease.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }
}
