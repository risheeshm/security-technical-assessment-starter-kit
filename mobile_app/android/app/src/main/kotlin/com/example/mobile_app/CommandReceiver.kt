package com.example.mobile_app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import java.io.File

// VULN-108: Exported BroadcastReceiver - command injection surface
class CommandReceiver : BroadcastReceiver() {
    
    override fun onReceive(context: Context?, intent: Intent?) {
        val command = intent?.getStringExtra("command")
        val args = intent?.getStringExtra("args")
        
        Log.d("CommandReceiver", "Received command: $command with args: $args")
        
        // VULN: No caller validation, executes commands from any app
        when (command) {
            "CLEAR_CACHE" -> {
                clearCache(context)
            }
            "EXPORT_DB" -> {
                // VULN: Exports database to external storage
                exportDatabase(context, args)
            }
            "EXECUTE_SQL" -> {
                // VULN: SQL injection surface
                executeSql(args)
            }
            "LOAD_LIBRARY" -> {
                // VULN: Could load malicious native libraries
                loadLibrary(args)
            }
            else -> {
                Log.w("CommandReceiver", "Unknown command: $command")
            }
        }
    }
    
    private fun clearCache(context: Context?) {
        context?.cacheDir?.deleteRecursively()
        Log.i("Command", "Cache cleared")
    }
    
    private fun exportDatabase(context: Context?, dbName: String?) {
        // VULN: Path traversal + data exfiltration
        if (context != null && dbName != null) {
            val dbFile = context.getDatabasePath(dbName)
            Log.w("Command", "Exporting database: ${dbFile.absolutePath}")
            // Actual export would happen here
        }
    }
    
    private fun executeSql(query: String?) {
        // VULN: SQL injection - accepts arbitrary SQL
        Log.w("SQL_INJECTION", "Executing query: $query")
        // This would execute against the app's database
    }
    
    private fun loadLibrary(libName: String?) {
        // VULN: Could load attacker-controlled native library
        if (libName != null) {
            try {
                System.loadLibrary(libName)
                Log.w("Command", "Loaded library: $libName")
            } catch (e: Exception) {
                Log.e("Command", "Failed to load library: ${e.message}")
            }
        }
    }
}
