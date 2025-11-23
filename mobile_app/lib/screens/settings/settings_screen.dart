import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../services/user_service.dart';
import '../../theme/app_theme.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final UserService _userService = UserService();
  final _passwordController = TextEditingController();
  final _customSettingsController = TextEditingController();
  String _role = 'user';
  bool _isLoading = false;

  @override
  void dispose() {
    _passwordController.dispose();
    _customSettingsController.dispose();
    super.dispose();
  }

  Future<void> _changePassword() async {
    if (_passwordController.text.isEmpty) return;
    setState(() => _isLoading = true);
    try {
      await _userService.changePassword(_passwordController.text);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Password changed successfully!'), backgroundColor: Colors.green),
        );
        _passwordController.clear();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.errorColor),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _updateProfile() async {
    setState(() => _isLoading = true);
    try {
      await _userService.updateSettings({'role': _role});
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Profile updated successfully!'), backgroundColor: Colors.green),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.errorColor),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _updateCustomSettings() async {
    if (_customSettingsController.text.isEmpty) return;
    setState(() => _isLoading = true);
    try {
      final settings = jsonDecode(_customSettingsController.text);
      await _userService.updateSettings(settings);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Settings updated successfully!'), backgroundColor: Colors.green),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.errorColor),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Settings')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildSection(
              title: 'Security',
              subtitle: 'Update your password to keep your account secure',
              children: [
                TextField(
                  controller: _passwordController,
                  obscureText: true,
                  decoration: AppTheme.inputDecoration.copyWith(
                    labelText: 'New Password',
                    prefixIcon: const Icon(Icons.lock, color: AppTheme.primaryColor),
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _isLoading ? null : _changePassword,
                  child: const Text('Update Password'),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSection(
              title: 'Profile Preferences',
              subtitle: 'Manage your account type and permissions',
              children: [
                DropdownButtonFormField<String>(
                  value: _role,
                  decoration: AppTheme.inputDecoration.copyWith(
                    labelText: 'Account Type',
                    prefixIcon: const Icon(Icons.person, color: AppTheme.primaryColor),
                  ),
                  items: const [
                    DropdownMenuItem(value: 'user', child: Text('Standard User')),
                    DropdownMenuItem(value: 'agent', child: Text('Agent')),
                    DropdownMenuItem(value: 'admin', child: Text('Administrator')),
                  ],
                  onChanged: (v) => setState(() => _role = v!),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _isLoading ? null : _updateProfile,
                  child: const Text('Save Preferences'),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildSection(
              title: 'Advanced Settings',
              subtitle: 'Advanced configuration options (JSON format)',
              children: [
                TextField(
                  controller: _customSettingsController,
                  maxLines: 5,
                  decoration: AppTheme.inputDecoration.copyWith(
                    labelText: 'JSON Configuration',
                    hintText: '{"theme": "dark", "notifications": true}',
                  ),
                  style: const TextStyle(fontFamily: 'monospace'),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _isLoading ? null : _updateCustomSettings,
                  child: const Text('Apply Settings'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required String subtitle,
    required List<Widget> children,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
          const SizedBox(height: 4),
          Text(subtitle, style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.grey)),
          const SizedBox(height: 16),
          ...children,
        ],
      ),
    ).animate().fadeIn().slideY(begin: 0.1, end: 0);
  }
}
