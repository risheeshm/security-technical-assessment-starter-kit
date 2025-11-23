import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

// VULN-133: WebView with arbitrary URL and JavaScript bridge
class WebViewScreen extends StatefulWidget {
  final String url;
  final bool enableJavaScript;
  
  const WebViewScreen({
    super.key,
    required this.url,
    this.enableJavaScript = true,
  });

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)  // VULN: Always enabled
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {},
          // VULN-134: No URL validation - allows any domain
          onNavigationRequest: (NavigationRequest request) {
            // Should validate URL but doesn't
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.url));
    
    // VULN-135: JavaScript bridge with no origin checks
    _addJavaScriptChannels();
  }

  void _addJavaScriptChannels() {
    _controller.addJavaScriptChannel(
      'AppBridge',
      onMessageReceived: (JavaScriptMessage message) {
        // VULN: No origin validation - any loaded page can call this
        _handleBridgeCall(message.message);
      },
    );
    
    _controller.addJavaScriptChannel(
      'SecureStorage',
      onMessageReceived: (JavaScriptMessage message) {
        // VULN-136: Exposes sensitive storage to JavaScript
        _handleStorageCall(message.message);
      },
    );
  }

  void _handleBridgeCall(String message) {
    print('Bridge call: $message');
    
    // Parse JSON command
    try {
      // VULN: Executes commands from any webpage
      final parts = message.split(':');
      final command = parts[0];
      final data = parts.length > 1 ? parts[1] : '';
      
      switch (command) {
        case 'GET_TOKEN':
          // Exposes auth token to JavaScript
          _sendTokenToJs();
          break;
        case 'EXECUTE':
          // Dangerous: executes arbitrary code
          _executeCommand(data);
          break;
        case 'READ_FILE':
          // Path traversal possible
          _readFile(data);
          break;
      }
    } catch (e) {
      print('Error handling bridge call: $e');
    }
  }

  void _sendTokenToJs() {
    // VULN: Sends sensitive data to JavaScript (any origin)
    _controller.runJavaScript('receiveToken("fake_token_12345")');
  }

  void _executeCommand(String command) {
    // VULN: Command execution from JavaScript
    print('Executing: $command');
  }

  void _readFile(String path) {
    // VULN: File access from JavaScript with path traversal
    print('Reading file: $path');
  }

  void _handleStorageCall(String message) {
    // VULN: Exposes app storage to JavaScript
    print('Storage call: $message');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Web View')),
      body: WebViewWidget(controller: _controller),
    );
  }
}
