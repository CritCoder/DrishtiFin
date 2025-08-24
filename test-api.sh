#!/bin/bash

# DRISHTI API Test Suite
# Base URL for the API
BASE_URL="https://dhr.deno.dev"

echo "🚀 Testing DRISHTI API at $BASE_URL"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected_status=$4
    local description=$5
    
    echo -e "\n${YELLOW}Testing: $description${NC}"
    echo "Endpoint: $method $endpoint"
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $JWT_TOKEN" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method \
            -H "Authorization: Bearer $JWT_TOKEN" \
            "$BASE_URL$endpoint")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS${NC} (Status: $http_code)"
    else
        echo -e "${RED}❌ FAIL${NC} (Expected: $expected_status, Got: $http_code)"
    fi
    
    echo "Response: $body"
    echo "----------------------------------------"
}

# 1. Health Check
echo -e "\n${YELLOW}1. HEALTH CHECK${NC}"
test_endpoint "GET" "/" 200 "Health check endpoint"

# 2. Authentication Tests
echo -e "\n${YELLOW}2. AUTHENTICATION TESTS${NC}"

# Register new user
test_endpoint "POST" "/api/auth/register" '{
    "email": "test@example.com",
    "password": "password123",
    "role": "student",
    "firstName": "Test",
    "lastName": "User",
    "phone": "1234567890"
}' 201 "User registration"

# Login
login_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "email": "admin@drishti.gov.in",
        "password": "admin123",
        "role": "osda_admin"
    }' \
    "$BASE_URL/api/auth/login")

echo -e "\n${YELLOW}Login Response:${NC}"
echo "$login_response"

# Extract JWT token for subsequent requests
JWT_TOKEN=$(echo "$login_response" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo -e "\n${YELLOW}JWT Token:${NC} ${JWT_TOKEN:0:50}..."

# 3. Training Partners Tests
echo -e "\n${YELLOW}3. TRAINING PARTNERS TESTS${NC}"

test_endpoint "GET" "/api/training-partners" 200 "Get all training partners"

test_endpoint "POST" "/api/training-partners" '{
    "name": "Test Training Center",
    "email": "test@training.com",
    "phone": "9876543210",
    "address": "123 Test Street, Test City",
    "gstNumber": "27AARFT0123A1Z5",
    "panNumber": "AARFT0123A",
    "contactPerson": "John Doe"
}' 201 "Create new training partner"

# 4. Students Tests
echo -e "\n${YELLOW}4. STUDENTS TESTS${NC}"

test_endpoint "GET" "/api/students" 200 "Get all students"

test_endpoint "POST" "/api/students" '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "dateOfBirth": "1995-05-15",
    "address": "456 Student Lane",
    "educationLevel": "Graduate",
    "course": "Web Development"
}' 201 "Create new student"

# 5. Batches Tests
echo -e "\n${YELLOW}5. BATCHES TESTS${NC}"

test_endpoint "GET" "/api/batches" 200 "Get all batches"

test_endpoint "POST" "/api/batches" '{
    "name": "Web Dev Batch 2024",
    "course": "Web Development",
    "startDate": "2024-03-01",
    "endDate": "2024-08-31",
    "capacity": 30,
    "trainingPartnerId": "tp_001"
}' 201 "Create new batch"

# 6. Placements Tests
echo -e "\n${YELLOW}6. PLACEMENTS TESTS${NC}"

test_endpoint "GET" "/api/placements" 200 "Get all placements"

test_endpoint "POST" "/api/placements" '{
    "studentId": "student_001",
    "companyName": "Tech Corp",
    "position": "Junior Developer",
    "salary": 450000,
    "placementDate": "2024-09-01",
    "status": "offered"
}' 201 "Create new placement"

# 7. Payments Tests
echo -e "\n${YELLOW}7. PAYMENTS TESTS${NC}"

test_endpoint "GET" "/api/payments" 200 "Get all payments"

test_endpoint "POST" "/api/payments" '{
    "trainingPartnerId": "tp_001",
    "batchId": "batch_001",
    "amount": 125000,
    "milestone": "batch_start",
    "description": "Batch start milestone payment"
}' 201 "Create new payment"

# 8. Integration Tests
echo -e "\n${YELLOW}8. INTEGRATION TESTS${NC}"

test_endpoint "POST" "/api/integrations/gstn/verify" '{
    "gstin": "27AARFR5953J1ZF"
}' 200 "GSTN verification"

test_endpoint "POST" "/api/integrations/pan/verify" '{
    "pan": "AARFR5953J"
}' 200 "PAN verification"

# 9. Admin Tests
echo -e "\n${YELLOW}9. ADMIN TESTS${NC}"

test_endpoint "GET" "/api/admin/dashboard" 200 "Admin dashboard stats"

test_endpoint "GET" "/api/admin/audit-logs" 200 "Get audit logs"

test_endpoint "GET" "/api/admin/system-health" 200 "System health check"

echo -e "\n${GREEN}🎉 API Testing Complete!${NC}"
echo "=================================================="
