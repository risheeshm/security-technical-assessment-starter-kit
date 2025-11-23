# Database Setup Guide

This folder contains all SQL scripts and documentation needed to set up the PostgreSQL database for the Real Estate Marketplace application.

## 📁 Files Overview

| File | Purpose | Description |
|------|---------|-------------|
| `init-database.sh` | **First-Time Setup** | **Comprehensive initialization script (RECOMMENDED)** |
| `setup.sh` | Quick Setup | Quick database setup script |
| `01_schema.sql` | DDL (Data Definition Language) | Creates all tables, indexes, constraints, and relationships |
| `02_sample_data.sql` | Sample Data | Inserts test users and property listings |
| `03_cleanup.sql` | Data Cleanup | Removes all data while preserving schema |
| `04_useful_queries.sql` | Test Queries | Common queries for testing and debugging |
| `05_backup_restore.sql` | Backup/Restore | Database backup and restore operations |
| `06_add_image_url_migration.sql` | Migration | Migration to add imageUrl column |
| `README.md` | Documentation | This file - setup instructions |

## 🗄️ Database Schema

### Tables

#### **user** table
Stores registered user accounts with authentication details.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing user ID |
| `name` | VARCHAR(255) | NOT NULL | User's full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User's email (used for login) |
| `password` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `role` | VARCHAR(50) | DEFAULT 'user' | User role (user, agent, admin) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Account creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_user_email` on `email` (for faster authentication lookups)

#### **listing** table
Stores property listings for sale or rent.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing listing ID |
| `title` | VARCHAR(255) | NOT NULL | Property title |
| `description` | TEXT | NOT NULL | Detailed property description |
| `price` | DECIMAL(12,2) | NOT NULL | Price (sale price or monthly rent) |
| `address` | TEXT | NOT NULL | Full property address |
| `type` | VARCHAR(20) | NOT NULL, CHECK | 'sale' or 'rent' |
| `bedrooms` | INTEGER | NOT NULL, CHECK >= 0 | Number of bedrooms |
| `bathrooms` | INTEGER | NOT NULL, CHECK >= 0 | Number of bathrooms |
| `sqft` | INTEGER | NOT NULL, CHECK > 0 | Square footage |
| `imageUrl` | VARCHAR(500) | - | URL to property image (optional) |
| `ownerId` | INTEGER | FK to user(id) | Reference to property owner |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Listing creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_listing_type` on `type` (for filtering by sale/rent)
- `idx_listing_owner` on `ownerId` (for user's listings)
- `idx_listing_price` on `price` (for price range queries)
- Full-text search indexes on `title`, `description`, `address` (for search functionality)

**Foreign Keys:**
- `ownerId` → `user(id)` (ON DELETE SET NULL)

### Relationships

```
user (1) ─────< (Many) listing
   ↑                    ↓
  One user can own many listings
```

## 🚀 Quick Start

### **NEW: One-Command First-Time Setup (RECOMMENDED)**

For first-time setup, use the comprehensive initialization script:

```bash
./Database/init-database.sh
```

This script will:
- ✅ Check all prerequisites (Docker, Docker Compose)
- ✅ Start the database container
- ✅ Create the database
- ✅ Run schema creation
- ✅ Apply all migrations
- ✅ Insert sample data
- ✅ Verify installation
- ✅ Display connection details

**Features:**
- Interactive prompts for database recreation
- Colored output for better readability
- Comprehensive error checking
- Automatic waiting for PostgreSQL to be ready
- Complete verification of setup
- Helpful next steps and quick commands

---

### Alternative Methods

### Option 1: Using Quick Setup Script

```bash
./Database/setup.sh
```

### Option 2: Using Docker Compose Manually

If you're using the project's Docker setup:

1. **Start the database container:**
   ```bash
   docker compose up -d db
   ```

2. **Run the schema script:**
   ```bash
   docker compose exec db psql -U postgres -d real_estate_db -f /Database/01_schema.sql
   ```

3. **Insert sample data:**
   ```bash
   docker compose exec db psql -U postgres -d real_estate_db -f /Database/02_sample_data.sql
   ```

### Option 2: Using psql CLI

If you have PostgreSQL installed locally:

1. **Create the database:**
   ```bash
   createdb real_estate_db
   ```

2. **Run the schema script:**
   ```bash
   psql -U postgres -d real_estate_db -f Database/01_schema.sql
   ```

3. **Insert sample data:**
   ```bash
   psql -U postgres -d real_estate_db -f Database/02_sample_data.sql
   ```

### Option 3: Copy-Paste in psql

1. **Connect to the database:**
   ```bash
   psql -U postgres -d real_estate_db
   ```

2. **Copy and paste the contents of each SQL file in order:**
   - First: `01_schema.sql`
   - Then: `02_sample_data.sql`

## 📊 Sample Data

The `02_sample_data.sql` script includes:

### Users (5 total)
- **John Doe** (user) - john.doe@example.com
- **Jane Smith** (agent) - jane.smith@example.com
- **Admin User** (admin) - admin@example.com
- **Sarah Johnson** (user) - sarah.j@example.com
- **Mike Wilson** (agent) - mike.w@example.com

*Note: Passwords are stored in PLAINTEXT for demonstration purposes (VULN-051). Do not use real passwords!*

### Listings (10 total)
- **5 For Sale** properties ranging from $590,000 to $2,500,000
- **5 For Rent** properties ranging from $1,800/mo to $4,500/mo

Properties include various types: apartments, houses, condos, villas, lofts in different locations.

## 🧪 Testing the Database

After setup, verify everything works:

```bash
# Connect to database
docker compose exec db psql -U postgres -d real_estate_db

# Or locally
psql -U postgres -d real_estate_db
```

Then run these verification queries:

```sql
-- Check tables exist
\dt

-- Count records
SELECT COUNT(*) FROM "user";
SELECT COUNT(*) FROM listing;

-- View sample listings
SELECT id, title, type, price FROM listing LIMIT 5;

-- Test search functionality
SELECT title, price FROM listing 
WHERE title ILIKE '%modern%' 
OR description ILIKE '%modern%';
```

See `04_useful_queries.sql` for more test queries.

## 🧹 Cleanup / Reset

To remove all data and start fresh:

```bash
docker compose exec db psql -U postgres -d real_estate_db -f /Database/03_cleanup.sql
```

Then re-run `02_sample_data.sql` to repopulate.

## 🔐 Connection Details

When running with Docker Compose:

| Parameter | Value |
|-----------|-------|
| **Host** | `localhost` (from host) or `db` (from other containers) |
| **Port** | `5432` |
| **Database** | `real_estate_db` |
| **Username** | `postgres` |
| **Password** | `postgres` |

Connection string:
```
postgresql://postgres:postgres@localhost:5432/real_estate_db
```

## 📝 Schema Diagram

```
┌─────────────────────┐
│       user          │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ email (UNIQUE)      │
│ password            │
│ role                │
│ created_at          │
│ updated_at          │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│      listing        │
├─────────────────────┤
│ id (PK)             │
│ title               │
│ description         │
│ price               │
│ address             │
│ type                │
│ bedrooms            │
│ bathrooms           │
│ sqft                │
│ ownerId (FK)        │
│ created_at          │
│ updated_at          │
└─────────────────────┘
```

## ⚙️ Configuration in Application

The NestJS backend connects using TypeORM configuration in `backend/src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'real_estate_db',
  entities: [User, Listing],
  synchronize: true, // Auto-sync schema (disable in production!)
})
```

## 🔒 Security Notes

1. **Change default passwords** in production
2. **Use environment variables** for credentials
3. **Disable `synchronize: true`** in TypeORM for production (use migrations instead)
4. **Hash all passwords** using bcrypt before storing
5. **Implement proper access control** at application level

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeORM Documentation](https://typeorm.io/)
- [Bcrypt for Password Hashing](https://www.npmjs.com/package/bcrypt)

## 🆘 Troubleshooting

### Database doesn't exist
```bash
docker compose exec db createdb -U postgres real_estate_db
```

### Permission denied
Make sure you're running commands as the `postgres` user or have appropriate permissions.

### Connection refused
Ensure the PostgreSQL container is running:
```bash
docker compose ps
```

### Schema already exists error
Run the cleanup script first:
```bash
docker compose exec db psql -U postgres -d real_estate_db -f /Database/03_cleanup.sql
```

## 📧 Support

For issues or questions about the database setup, please refer to the main project documentation or contact the development team.
