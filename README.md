# DRISHTI Backend API

A comprehensive training partner management system backend built with Deno Deploy and Deno KV.

## Features

- **Authentication**: JWT-based auth with role-based access control
- **Training Partners**: Complete CRUD operations for TP management
- **Students & Batches**: Student enrollment and batch management
- **Placements**: Job placement tracking and verification
- **Payments**: Milestone-based payment processing
- **Integrations**: Government service integrations (GSTN, PAN, EPFO, MCA)
- **Admin Dashboard**: System monitoring and audit logs

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile

### Training Partners
- `GET /api/training-partners` - List all training partners
- `POST /api/training-partners` - Create new training partner
- `GET /api/training-partners/:id` - Get training partner details
- `PUT /api/training-partners/:id` - Update training partner
- `DELETE /api/training-partners/:id` - Delete training partner

### Students
- `GET /api/students` - List students
- `POST /api/students` - Create student
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student

### Batches
- `GET /api/batches` - List batches
- `POST /api/batches` - Create batch
- `GET /api/batches/:id` - Get batch details
- `PUT /api/batches/:id` - Update batch

### Placements
- `GET /api/placements` - List placements
- `POST /api/placements` - Create placement
- `GET /api/placements/:id` - Get placement details
- `PUT /api/placements/:id` - Update placement

### Payments
- `GET /api/payments` - List payments
- `POST /api/payments` - Create payment
- `GET /api/payments/milestones` - Get payment milestones

### Integrations
- `POST /api/integrations/gstn/verify` - GSTN verification
- `POST /api/integrations/pan/verify` - PAN verification
- `POST /api/integrations/epfo/verify` - EPFO verification
- `POST /api/integrations/mca/verify` - MCA verification

### Admin
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/audit-logs` - Audit logs
- `GET /api/admin/health` - System health

## Deployment

### Deploy to Deno Deploy

1. **Using Deno Deploy CLI:**
\`\`\`bash
# Install Deno Deploy CLI
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts

# Deploy to Deno Deploy
deployctl deploy --project=drishti-api main.ts
\`\`\`

2. **Using curl (as provided):**
\`\`\`bash
curl -X POST "https://api.deno.com/v1/projects/drishti-api/deployments" \
  -H "Authorization: Bearer YOUR_DENO_DEPLOY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "entryPointUrl": "main.ts",
    "assets": {},
    "envVars": {
      "JWT_SECRET": "your-jwt-secret-key"
    }
  }'
\`\`\`

3. **Environment Variables:**
Set the following environment variables in Deno Deploy dashboard:
- `JWT_SECRET`: Secret key for JWT token signing

## Local Development

\`\`\`bash
# Start development server
deno task dev

# Or run directly
deno run --allow-net --allow-env --allow-read --watch main.ts
\`\`\`

## Database Schema

The system uses Deno KV with the following key patterns:
- `users:{id}` - User records
- `training_partners:{id}` - Training partner records
- `students:{id}` - Student records
- `batches:{id}` - Batch records
- `placements:{id}` - Placement records
- `payments:{id}` - Payment records
- `audit_logs:{timestamp}` - Audit log entries

## Authentication & Authorization

The API uses JWT tokens for authentication with role-based access control:
- **OSDA Admin**: Full system access
- **Training Partner**: Access to own data and students
- **Student**: Access to own profile and batch info
- **Employer**: Access to placement-related data
- **System Integrator**: Read-only access for auditing

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (development)
- `https://drishti-training.vercel.app` (production)
- Any `*.vercel.app` subdomain

## Error Handling

All endpoints return consistent error responses:
\`\`\`json
{
  "error": "Error Type",
  "message": "Detailed error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- Integration endpoints: 10 requests per minute
