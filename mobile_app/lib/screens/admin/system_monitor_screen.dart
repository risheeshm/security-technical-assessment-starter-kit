import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../services/system_service.dart';
import '../../theme/app_theme.dart';

class SystemMonitorScreen extends StatefulWidget {
  const SystemMonitorScreen({super.key});

  @override
  State<SystemMonitorScreen> createState() => _SystemMonitorScreenState();
}

class _SystemMonitorScreenState extends State<SystemMonitorScreen> {
  final SystemService _systemService = SystemService();
  Map<String, dynamic>? _envVars;
  Map<String, dynamic>? _routes;
  List<dynamic>? _users;
  Map<String, dynamic>? _analytics;
  final _analyticsIdController = TextEditingController(text: '1');
  bool _isLoading = false;

  @override
  void dispose() {
    _analyticsIdController.dispose();
    super.dispose();
  }

  Future<void> _fetchEnv() async {
    setState(() => _isLoading = true);
    try {
      final data = await _systemService.getEnv();
      setState(() => _envVars = data);
    } catch (e) {
      _showError(e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _fetchRoutes() async {
    setState(() => _isLoading = true);
    try {
      final data = await _systemService.getRoutes();
      setState(() => _routes = data);
    } catch (e) {
      _showError(e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _fetchUsers() async {
    setState(() => _isLoading = true);
    try {
      final data = await _systemService.getUsers();
      setState(() => _users = data);
    } catch (e) {
      _showError(e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  Future<void> _fetchAnalytics() async {
    if (_analyticsIdController.text.isEmpty) return;
    setState(() => _isLoading = true);
    try {
      final data = await _systemService.getAnalytics(_analyticsIdController.text);
      setState(() => _analytics = data);
    } catch (e) {
      _showError(e.toString());
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _showError(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $message'), backgroundColor: AppTheme.errorColor),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('System Monitor')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildSection(
              title: 'Configuration',
              subtitle: 'View system configuration and environment',
              onPressed: _fetchEnv,
              buttonText: 'View Config',
              data: _envVars,
            ),
            const SizedBox(height: 24),
            _buildSection(
              title: 'API Endpoints',
              subtitle: 'View registered application routes',
              onPressed: _fetchRoutes,
              buttonText: 'View Routes',
              data: _routes,
            ),
            const SizedBox(height: 24),
            _buildSection(
              title: 'User Management',
              subtitle: 'View registered users',
              onPressed: _fetchUsers,
              buttonText: 'Load Users',
              data: _users,
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppTheme.surfaceColor,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.white10),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Analytics Dashboard', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text('View user activity analytics', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: Colors.grey)),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _analyticsIdController,
                    keyboardType: TextInputType.number,
                    decoration: AppTheme.inputDecoration.copyWith(labelText: 'User ID'),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _fetchAnalytics,
                    child: const Text('Load Analytics'),
                  ),
                  if (_analytics != null) ...[
                    const SizedBox(height: 16),
                    _buildJsonView(_analytics),
                  ],
                ],
              ),
            ).animate().fadeIn().slideY(begin: 0.1, end: 0),
          ],
        ),
      ),
    );
  }

  Widget _buildSection({
    required String title,
    required String subtitle,
    required VoidCallback onPressed,
    required String buttonText,
    dynamic data,
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
          ElevatedButton(
            onPressed: _isLoading ? null : onPressed,
            child: Text(buttonText),
          ),
          if (data != null) ...[
            const SizedBox(height: 16),
            _buildJsonView(data),
          ],
        ],
      ),
    ).animate().fadeIn().slideY(begin: 0.1, end: 0);
  }

  Widget _buildJsonView(dynamic data) {
    const JsonEncoder encoder = JsonEncoder.withIndent('  ');
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.black54,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        encoder.convert(data),
        style: const TextStyle(fontFamily: 'monospace', fontSize: 12, color: Colors.greenAccent),
      ),
    );
  }
}
