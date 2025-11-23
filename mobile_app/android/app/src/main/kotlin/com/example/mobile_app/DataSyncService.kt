package com.example.mobile_app

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import java.io.File

// VULN-107: Exported Service - confused deputy flow
class DataSyncService : Service() {
    
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // No caller identity check
        val operation = intent?.getStringExtra("operation")
        val target = intent?.getStringExtra("target")
        val data = intent?.getStringExtra("data")
        
        Log.d("DataSyncService", "Operation: $operation on $target")
        
        when (operation) {
            "SYNC" -> {
                // Performs sync on behalf of any caller
                syncData(target, data)
            }
            "DELETE" -> {
                // Dangerous: deletes files without permission check
                deleteData(target)
            }
            "BACKUP" -> {
                // Exposes sensitive data
                backupData(target)
            }
        }
        
        return START_NOT_STICKY
    }
    
    private fun syncData(target: String?, data: String?) {
        Log.i("DataSync", "Syncing $target with $data")
        // TODO: Implement actual sync
    }
    
    private fun deleteData(target: String?) {
        if (target != null) {
            // VULN: Path traversal possible
            val file = File(filesDir, target)
            if (file.exists()) {
                file.delete()
                Log.w("DataSync", "Deleted: $target")
            }
        }
    }
    
    private fun backupData(target: String?) {
        // VULN: Exposes app's private data
        Log.i("DataSync", "Backing up: $target")
        // Backup logic would go here
    }
}
