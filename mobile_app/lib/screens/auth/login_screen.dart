import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../providers/auth_provider.dart';
import '../../services/api_service.dart';
import '../../theme/app_theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => _showUrlSettings(context),
            tooltip: 'API Settings',
          ),
        ],
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Icon(
                  Icons.home_work_outlined,
                  size: 80,
                  color: AppTheme.primaryColor,
                ).animate().scale(duration: 600.ms, curve: Curves.easeOutBack),
                const SizedBox(height: 24),
                Text(
                  'Welcome Back',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: AppTheme.onBackground,
                      ),
                  textAlign: TextAlign.center,
                ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.3, end: 0),
                const SizedBox(height: 8),
                Text(
                  'Sign in to continue',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: AppTheme.onSurface,
                      ),
                  textAlign: TextAlign.center,
                ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.3, end: 0),
                const SizedBox(height: 48),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'Email',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                  validator: (value) =>
                      value!.isEmpty ? 'Please enter your email' : null,
                ).animate().fadeIn(delay: 400.ms).slideX(begin: -0.2, end: 0),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'Password',
                    prefixIcon: Icon(Icons.lock_outline),
                  ),
                  obscureText: true,
                  validator: (value) =>
                      value!.isEmpty ? 'Please enter your password' : null,
                ).animate().fadeIn(delay: 500.ms).slideX(begin: -0.2, end: 0),
                const SizedBox(height: 32),
                Consumer<AuthProvider>(
                  builder: (context, auth, child) {
                    return ElevatedButton(
                      onPressed: auth.isLoading
                          ? null
                          : () async {
                              if (_formKey.currentState!.validate()) {
                                try {
                                  await auth.login(
                                    _emailController.text,
                                    _passwordController.text,
                                  );
                                  if (!mounted) return;
                                  Navigator.pushReplacementNamed(context, '/home');
                                } catch (e) {
                                  if (!mounted) return;
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('Login failed: $e'),
                                      backgroundColor: AppTheme.errorColor,
                                    ),
                                  );
                                }
                              }
                            },
                      child: auth.isLoading
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Colors.white,
                              ),
                            )
                          : const Text('Login'),
                    );
                  },
                ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.2, end: 0),
                const SizedBox(height: 16),
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/register');
                  },
                  child: const Text('Don\'t have an account? Sign Up'),
                ).animate().fadeIn(delay: 700.ms),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _showUrlSettings(BuildContext context) async {
    final currentUrl = await ApiService.getBaseUrl();
    final customUrlController = TextEditingController();
    
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('API Server Settings'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Current URL: $currentUrl',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
            const SizedBox(height: 16),
            const Text('Select Mode:', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            ListTile(
              title: const Text('Android Emulator'),
              subtitle: const Text('http://10.0.2.2:3000'),
              onTap: () async {
                await ApiService.setBaseUrl('http://10.0.2.2:3000');
                if (context.mounted) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Switched to Emulator mode')),
                  );
                }
              },
            ),
            ListTile(
              title: const Text('Physical Device / iOS'),
              subtitle: const Text('http://localhost:3000'),
              onTap: () async {
                await ApiService.setBaseUrl('http://localhost:3000');
                if (context.mounted) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Switched to Physical Device mode')),
                  );
                }
              },
            ),
            ListTile(
              title: const Text('Use Default (Auto)'),
              subtitle: const Text('Auto-detect based on platform'),
              onTap: () async {
                await ApiService.clearBaseUrl();
                if (context.mounted) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Switched to Auto mode')),
                  );
                }
              },
            ),
            const Divider(),
            const SizedBox(height: 8),
            TextField(
              controller: customUrlController,
              decoration: const InputDecoration(
                labelText: 'Custom URL',
                hintText: 'http://192.168.1.100:3000',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () async {
                  if (customUrlController.text.isNotEmpty) {
                    await ApiService.setBaseUrl(customUrlController.text);
                    if (context.mounted) {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Custom URL set: ${customUrlController.text}')),
                      );
                    }
                  }
                },
                child: const Text('Set Custom URL'),
              ),
            ),
          ],
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
