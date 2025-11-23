#!/bin/bash

# ============================================
# Database Setup Script
# ============================================
# Quick setup script for Real Estate database
# ============================================

set -e  # Exit on error

echo "🗄️  Real Estate Marketplace - Database Setup"
echo "============================================"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if database container is running
if ! docker compose ps | grep -q "db.*running"; then
    echo "📦 Starting database container..."
    docker compose up -d db
    echo "⏳ Waiting for PostgreSQL to be ready..."
    sleep 5
fi

echo "✓ Database container is running"
echo ""

# Create database if it doesn't exist
echo "📊 Creating database (if not exists)..."
docker compose exec -T db psql -U postgres -c "CREATE DATABASE real_estate_db;" 2>/dev/null || echo "Database already exists"
echo ""

# Run schema script
echo "🔧 Creating database schema..."
docker compose exec -T db psql -U postgres -d real_estate_db < Database/01_schema.sql
echo ""

# Insert sample data
echo "📝 Inserting sample data..."
docker compose exec -T db psql -U postgres -d real_estate_db < Database/02_sample_data.sql
echo ""

# Verify installation
echo "🔍 Verifying installation..."
USER_COUNT=$(docker compose exec -T db psql -U postgres -d real_estate_db -t -c "SELECT COUNT(*) FROM \"user\";")
LISTING_COUNT=$(docker compose exec -T db psql -U postgres -d real_estate_db -t -c "SELECT COUNT(*) FROM listing;")

echo "✓ Users: $USER_COUNT"
echo "✓ Listings: $LISTING_COUNT"
echo ""

echo "============================================"
echo "✅ Database setup complete!"
echo "============================================"
echo ""
echo "Connection details:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: real_estate_db"
echo "  Username: postgres"
echo "  Password: postgres"
echo ""
echo "To connect:"
echo "  docker compose exec db psql -U postgres -d real_estate_db"
echo ""
