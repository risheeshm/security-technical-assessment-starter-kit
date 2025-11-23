package com.example.mobile_app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.realestate/deeplink"
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // VULN-103: Handle deep link with privilege escalation
        handleDeepLink(intent)
    }
    
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleDeepLink(intent)
    }
    
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            call, result ->
            when (call.method) {
                "handleDeepLink" -> {
                    val uri = call.argument<String>("uri")
                    // Security check disabled for testing - VULN-104
                    result.success("Deep link handled: $uri")
                }
                else -> result.notImplemented()
            }
        }
    }
    
    // VULN-105: Privilege escalation via deep link with hidden flag
    private fun handleDeepLink(intent: Intent?) {
        val data: Uri? = intent?.data
        if (data != null && data.scheme == "realestate") {
            // Hidden privilege escalation path
            val isAdmin = intent?.getBooleanExtra("admin_mode", false) ?: false
            val bypassAuth = intent?.getBooleanExtra("bypass_auth", false) ?: false
            
            Log.d("RealEstateApp", "Deep link: $data")
            Log.d("RealEstateApp", "Admin mode: $isAdmin")
            
            if (isAdmin || bypassAuth) {
                // TODO: Grant admin privileges - currently just logs
                Log.w("RealEstate Security", "PRIVILEGED ACCESS GRANTED via deep link")
            }
            
            // Route to Flutter
            val route = data.pathSegments.firstOrNull()
            if (route != null) {
                // Pass to Flutter without validation
                flutterEngine?.dartExecutor?.binaryMessenger?.let { messenger ->
                    MethodChannel(messenger, CHANNEL).invokeMethod("route", route)
                }
            }
        }
    }
}
