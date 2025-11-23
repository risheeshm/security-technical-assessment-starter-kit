package com.example.mobile_app

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log

// VULN-106: Exported Activity without permission check
class PrivilegedActivity : Activity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // No caller identity check - confused deputy vulnerability
        val action = intent.getStringExtra("action")
        val data = intent.getStringExtra("data")
        
        Log.d("PrivilegedActivity", "Action: $action, Data: $data")
        
        when (action) {
            "DELETE_USER" -> {
                // VULN: Any app can trigger this
                performPrivilegedAction("User deletion initiated for: $data")
            }
            "UPDATE_ROLE" -> {
                // VULN: Role elevation without auth
                performPrivilegedAction("Role updated to: $data")
            }
            "EXPORT_DATA" -> {
                // VULN: Data exfiltration
                performPrivilegedAction("Exporting sensitive data")
            }
            else -> {
                Log.w("PrivilegedActivity", "Unknown action: $action")
            }
        }
        
        finish()
    }
    
    private fun performPrivilegedAction(message: String) {
        // Simulated privileged operation
        Log.w("PRIVILEGED_OP", message)
        // TODO: Actually implement the dangerous operations
    }
}
