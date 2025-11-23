#!/bin/bash

# ============================================
# First-Time Database Initialization Script
# ============================================
# This script performs a complete first-time setup of the
# Real Estate Marketplace database including:
# - Database creation
# - Schema setup
# - Migrations
# - Sample data population
# - Verification
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Database configuration
DB_USER="postgres"
DB_PASSWORD="password"
DB_NAME="real_estate_db"
DB_HOST="localhost"
DB_PORT="5432"

# Script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

print_header() {
    echo ""
    echo "============================================"
    echo "$1"
    echo "============================================"
    echo ""
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker Desktop."
        exit 1
    fi
    log_success "Docker is installed"

    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
    log_success "Docker is running"

    # Check if docker-compose is available
    if ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not available."
        exit 1
    fi
    log_success "Docker Compose is available"
}

# Start database container
start_database() {
    print_header "Starting Database Container"

    # Check if database container is already running
    if docker compose ps | grep -q "db.*running"; then
        log_success "Database container is already running"
    else
        log_info "Starting database container..."
        docker compose up -d db

        log_info "Waiting for PostgreSQL to be ready..."
        sleep 5

        # Wait for PostgreSQL to be ready (up to 30 seconds)
        MAX_TRIES=30
        COUNTER=0
        while [ $COUNTER -lt $MAX_TRIES ]; do
            if docker compose exec -T db pg_isready -U $DB_USER > /dev/null 2>&1; then
                log_success "PostgreSQL is ready"
                break
            fi
            COUNTER=$((COUNTER+1))
            echo -n "."
            sleep 1
        done

        if [ $COUNTER -eq $MAX_TRIES ]; then
            log_error "PostgreSQL failed to start within 30 seconds"
            exit 1
        fi
    fi
}

# Create database
create_database() {
    print_header "Creating Database"

    log_info "Checking if database '$DB_NAME' exists..."

    # Check if database exists
    DB_EXISTS=$(docker compose exec -T db psql -U $DB_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" 2>/dev/null || echo "0")

    if [ "$DB_EXISTS" = "1" ]; then
        log_warning "Database '$DB_NAME' already exists"

        # Ask user if they want to recreate
        read -p "Do you want to drop and recreate the database? This will DELETE ALL DATA! (yes/no): " -r
        echo
        if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
            log_info "Dropping existing database..."
            docker compose exec -T db psql -U $DB_USER -c "DROP DATABASE IF EXISTS $DB_NAME;" > /dev/null 2>&1

            log_info "Creating database '$DB_NAME'..."
            docker compose exec -T db psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" > /dev/null 2>&1
            log_success "Database recreated successfully"
        else
            log_info "Keeping existing database"
        fi
    else
        log_info "Creating database '$DB_NAME'..."
        docker compose exec -T db psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" > /dev/null 2>&1
        log_success "Database created successfully"
    fi
}

# Run schema setup
setup_schema() {
    print_header "Setting Up Database Schema"

    if [ ! -f "$SCRIPT_DIR/01_schema.sql" ]; then
        log_error "Schema file not found: $SCRIPT_DIR/01_schema.sql"
        exit 1
    fi

    log_info "Creating tables and indexes..."
    docker compose exec -T db psql -U $DB_USER -d $DB_NAME < "$SCRIPT_DIR/01_schema.sql"
    log_success "Schema created successfully"
}

# Run migrations
run_migrations() {
    print_header "Running Database Migrations"

    # Find all migration files
    MIGRATION_FILES=$(find "$SCRIPT_DIR" -name "06_*.sql" -o -name "*_migration.sql" | sort)

    if [ -z "$MIGRATION_FILES" ]; then
        log_info "No migration files found, skipping..."
    else
        for MIGRATION_FILE in $MIGRATION_FILES; do
            log_info "Running migration: $(basename $MIGRATION_FILE)"
            docker compose exec -T db psql -U $DB_USER -d $DB_NAME < "$MIGRATION_FILE"
        done
        log_success "All migrations completed"
    fi
}

# Insert sample data
insert_sample_data() {
    print_header "Inserting Sample Data"

    if [ ! -f "$SCRIPT_DIR/02_sample_data.sql" ]; then
        log_error "Sample data file not found: $SCRIPT_DIR/02_sample_data.sql"
        exit 1
    fi

    log_info "Inserting users and listings..."
    docker compose exec -T db psql -U $DB_USER -d $DB_NAME < "$SCRIPT_DIR/02_sample_data.sql"
    log_success "Sample data inserted successfully"
}

# Verify installation
verify_installation() {
    print_header "Verifying Installation"

    log_info "Checking database objects..."

    # Count tables
    TABLE_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';")
    log_info "Tables created: $TABLE_COUNT"

    # Count users
    USER_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM \"user\";")
    log_success "Users inserted: $USER_COUNT"

    # Count listings
    LISTING_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM listing;")
    log_success "Listings inserted: $LISTING_COUNT"

    # Count sale listings
    SALE_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM listing WHERE type = 'sale';")
    log_info "  - For Sale: $SALE_COUNT"

    # Count rent listings
    RENT_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM listing WHERE type = 'rent';")
    log_info "  - For Rent: $RENT_COUNT"

    # Verify indexes
    INDEX_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public';")
    log_success "Indexes created: $INDEX_COUNT"

    # Check foreign key constraints
    FK_COUNT=$(docker compose exec -T db psql -U $DB_USER -d $DB_NAME -tAc "SELECT COUNT(*) FROM information_schema.table_constraints WHERE constraint_type = 'FOREIGN KEY';")
    log_success "Foreign key constraints: $FK_COUNT"
}

# Display connection info
display_connection_info() {
    print_header "Database Setup Complete!"

    echo -e "${GREEN}✓ Database initialized successfully!${NC}"
    echo ""
    echo "Connection Details:"
    echo "  Host:     $DB_HOST"
    echo "  Port:     $DB_PORT"
    echo "  Database: $DB_NAME"
    echo "  Username: $DB_USER"
    echo "  Password: $DB_PASSWORD"
    echo ""
    echo "Quick Commands:"
    echo "  Connect to database:"
    echo "    docker compose exec db psql -U $DB_USER -d $DB_NAME"
    echo ""
    echo "  View all users:"
    echo "    docker compose exec db psql -U $DB_USER -d $DB_NAME -c 'SELECT * FROM \"user\";'"
    echo ""
    echo "  View all listings:"
    echo "    docker compose exec db psql -U $DB_USER -d $DB_NAME -c 'SELECT * FROM listing;'"
    echo ""
    echo "  Reset sample data:"
    echo "    ./Database/setup.sh"
    echo ""
    echo "Next Steps:"
    echo "  1. Start the backend: docker compose up -d backend"
    echo "  2. Start the frontend: docker compose up -d frontend"
    echo "  3. Access the app at http://localhost:5173"
    echo ""
}

# Main execution
main() {
    clear
    print_header "Real Estate Marketplace - First-Time Database Setup"

    check_prerequisites
    start_database
    create_database
    setup_schema
    run_migrations
    insert_sample_data
    verify_installation
    display_connection_info

    echo -e "${GREEN}🎉 All done! Your database is ready to use.${NC}"
    echo ""
}

# Run main function
main
