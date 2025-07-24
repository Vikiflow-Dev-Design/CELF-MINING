#!/bin/bash

# CELF Project Cleanup Script
# Removes temporary files and development artifacts

echo "🧹 Cleaning up CELF project temporary files..."

# Remove test and example files
echo "📝 Removing test and example files..."
rm -f celf-mobile/test/miningServiceTest.ts
rm -f celf-mobile/utils/mining-rate-example.html
rm -f celf-mobile/components/mining/MiningExample.tsx

# Remove development documentation
echo "📚 Removing development documentation..."
rm -f celf-mobile/docs/MINING_FUNCTIONALITY.md
rm -f celf-mobile/docs/MINING_INTEGRATION_SUMMARY.md
rm -f celf-mobile/TODO.md

# Remove environment files (keep .env.local.example)
echo "🔐 Removing environment files..."
rm -f celf-mobile/.env
rm -f celf-mobile/.env.local

# Remove node_modules (can be regenerated)
echo "📦 Removing node_modules directories..."
rm -rf celf-mobile/node_modules
rm -rf celf-website/node_modules

# Optional: Remove lock files (uncomment if desired)
# echo "🔒 Removing lock files..."
# rm -f celf-mobile/package-lock.json
# rm -f celf-website/package-lock.json

# Remove empty test directory if it exists
if [ -d "celf-mobile/test" ] && [ -z "$(ls -A celf-mobile/test)" ]; then
    echo "📁 Removing empty test directory..."
    rmdir celf-mobile/test
fi

# Remove empty mining components directory if it exists
if [ -d "celf-mobile/components/mining" ] && [ -z "$(ls -A celf-mobile/components/mining)" ]; then
    echo "📁 Removing empty mining components directory..."
    rmdir celf-mobile/components/mining
fi

echo "✅ Cleanup complete!"
echo ""
echo "📋 Summary of removed files:"
echo "   - Test files (miningServiceTest.ts, MiningExample.tsx)"
echo "   - Example files (mining-rate-example.html)"
echo "   - Development docs (MINING_*.md, TODO.md)"
echo "   - Environment files (.env, .env.local)"
echo "   - Node modules directories"
echo ""
echo "🔄 To restore dependencies, run:"
echo "   cd celf-mobile && npm install"
echo "   cd celf-website && npm install"
