import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../services/database_helper.dart';
import '../../theme/app_theme.dart';

class TransactionHistoryScreen extends StatefulWidget {
  const TransactionHistoryScreen({super.key});

  @override
  State<TransactionHistoryScreen> createState() => _TransactionHistoryScreenState();
}

class _TransactionHistoryScreenState extends State<TransactionHistoryScreen> {
  List<Map<String, dynamic>> _transactions = [];
  bool _isLoading = true;
  final _currencyFormat = NumberFormat.simpleCurrency();
  final _dateFormat = DateFormat.yMMMd().add_jm();

  @override
  void initState() {
    super.initState();
    _loadTransactions();
  }

  Future<void> _loadTransactions() async {
    try {
      final data = await DatabaseHelper.instance.getTransactions();
      setState(() {
        _transactions = data;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      // Handle error
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Transaction History')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _transactions.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.history, size: 80, color: Colors.grey),
                      const SizedBox(height: 16),
                      Text(
                        'No transactions yet',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.grey),
                      ),
                    ],
                  ).animate().fadeIn(),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _transactions.length,
                  itemBuilder: (context, index) {
                    final transaction = _transactions[index];
                    return Card(
                      margin: const EdgeInsets.only(bottom: 12),
                      child: ListTile(
                        leading: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppTheme.primaryColor.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.receipt_long, color: AppTheme.primaryColor),
                        ),
                        title: Text(
                          transaction['title'] ?? 'Unknown Property',
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                          _dateFormat.format(DateTime.parse(transaction['date'])),
                          style: const TextStyle(fontSize: 12),
                        ),
                        trailing: Text(
                          _currencyFormat.format(transaction['price']),
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            color: AppTheme.secondaryColor,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ).animate().fadeIn(delay: (index * 50).ms).slideX(begin: 0.2, end: 0);
                  },
                ),
    );
  }
}
