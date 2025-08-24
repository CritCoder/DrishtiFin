#!/bin/bash

# DRISHTI Backend Deployment Script for Deno Deploy

echo "🚀 Deploying DRISHTI Backend to Deno Deploy..."

# Check if deployctl is installed
if ! command -v deployctl &> /dev/null; then
    echo "Installing Deno Deploy CLI..."
    deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts
fi

# Deploy to Deno Deploy
echo "Deploying to Deno Deploy..."
deployctl deploy --project=drishti-api main.ts

echo "✅ Deployment complete!"
echo "🌐 Your API is available at: https://drishti-api.deno.dev"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Deno Deploy dashboard:"
echo "   - JWT_SECRET: your-jwt-secret-key"
echo "2. Update CORS origins if needed"
echo "3. Test the API endpoints"
echo ""
echo "🔗 Deno Deploy Dashboard: https://dash.deno.com/projects/drishti-api"
