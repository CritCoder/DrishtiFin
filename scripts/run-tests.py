#!/usr/bin/env python3
"""
DRISHTI API Test Suite
Tests all backend endpoints and functionality
"""

import requests
import json
import sys
from typing import Dict, Any

# Configuration
BASE_URL = "https://dhr.deno.dev"
TEST_USER = {
    "email": "admin@drishti.gov.in",
    "password": "admin123",
    "role": "osda_admin",
    "subtype": "super_admin"
}

class DrishtiAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.auth_token = None
        self.test_results = []

    def log_test(self, test_name: str, success: bool, message: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message
        })

    def test_health_check(self):
        """Test basic server health"""
        try:
            response = self.session.get(f"{self.base_url}/health")
            success = response.status_code == 200
            self.log_test("Health Check", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Health Check", False, str(e))
            return False

    def test_authentication(self):
        """Test user authentication"""
        try:
            # Test login
            login_data = {
                "email": TEST_USER["email"],
                "password": TEST_USER["password"],
                "role": TEST_USER["role"],
                "subtype": TEST_USER["subtype"]
            }
            
            response = self.session.post(f"{self.base_url}/api/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if "token" in data:
                    self.auth_token = data["token"]
                    self.session.headers.update({"Authorization": f"Bearer {self.auth_token}"})
                    self.log_test("Authentication", True, "Login successful")
                    return True
                else:
                    self.log_test("Authentication", False, "No token in response")
                    return False
            else:
                self.log_test("Authentication", False, f"Login failed: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Authentication", False, str(e))
            return False

    def test_training_partners(self):
        """Test training partners endpoints"""
        try:
            # Test GET training partners
            response = self.session.get(f"{self.base_url}/api/training-partners")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                count = len(data.get("data", []))
                self.log_test("Training Partners - List", True, f"Found {count} partners")
            else:
                self.log_test("Training Partners - List", False, f"Status: {response.status_code}")
            
            return success
            
        except Exception as e:
            self.log_test("Training Partners - List", False, str(e))
            return False

    def test_students(self):
        """Test students endpoints"""
        try:
            response = self.session.get(f"{self.base_url}/api/students")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                count = len(data.get("data", []))
                self.log_test("Students - List", True, f"Found {count} students")
            else:
                self.log_test("Students - List", False, f"Status: {response.status_code}")
            
            return success
            
        except Exception as e:
            self.log_test("Students - List", False, str(e))
            return False

    def test_batches(self):
        """Test batches endpoints"""
        try:
            response = self.session.get(f"{self.base_url}/api/batches")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                count = len(data.get("data", []))
                self.log_test("Batches - List", True, f"Found {count} batches")
            else:
                self.log_test("Batches - List", False, f"Status: {response.status_code}")
            
            return success
            
        except Exception as e:
            self.log_test("Batches - List", False, str(e))
            return False

    def test_placements(self):
        """Test placements endpoints"""
        try:
            response = self.session.get(f"{self.base_url}/api/placements")
            success = response.status_code == 200
            
            if success:
                data = response.json()
                count = len(data.get("data", []))
                self.log_test("Placements - List", True, f"Found {count} placements")
            else:
                self.log_test("Placements - List", False, f"Status: {response.status_code}")
            
            return success
            
        except Exception as e:
            self.log_test("Placements - List", False, str(e))
            return False

    def test_integrations(self):
        """Test integration endpoints"""
        try:
            # Test GSTN verification
            gstn_data = {"gstin": "27AARFR5953J1ZF"}
            response = self.session.post(f"{self.base_url}/api/integrations/gstn/verify", json=gstn_data)
            
            success = response.status_code in [200, 201]
            if success:
                self.log_test("GSTN Integration", True, "GSTN verification working")
            else:
                self.log_test("GSTN Integration", False, f"Status: {response.status_code}")
            
            return success
            
        except Exception as e:
            self.log_test("GSTN Integration", False, str(e))
            return False

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting DRISHTI API Test Suite")
        print("=" * 50)
        
        tests = [
            self.test_health_check,
            self.test_authentication,
            self.test_training_partners,
            self.test_students,
            self.test_batches,
            self.test_placements,
            self.test_integrations
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            if test():
                passed += 1
        
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All tests passed! DRISHTI API is working correctly.")
            return True
        else:
            print("⚠️  Some tests failed. Check the logs above.")
            return False

def main():
    """Main function"""
    tester = DrishtiAPITester(BASE_URL)
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
