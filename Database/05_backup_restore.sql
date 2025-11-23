-- ============================================
-- Database Backup Script
-- ============================================
-- Use this to create a backup of the database
-- ============================================

-- To create a backup, run this command from terminal:
-- docker compose exec db pg_dump -U postgres real_estate_db > backup_$(date +%Y%m%d_%H%M%S).sql

-- To restore from a backup:
-- docker compose exec -T db psql -U postgres -d real_estate_db < backup_YYYYMMDD_HHMMSS.sql

-- For compressed backup:
-- docker compose exec db pg_dump -U postgres -F c real_estate_db > backup.dump

-- To restore compressed backup:
-- docker compose exec -T db pg_restore -U postgres -d real_estate_db backup.dump
