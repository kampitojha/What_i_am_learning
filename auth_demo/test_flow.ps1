# 1. Login as 'John Doe' (Normal User)
Write-Host "--- 1. Logging in as 'john_doe' ---" -ForegroundColor Cyan
$loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/login" -Method Post -ContentType "application/json" -Body '{"username": "john_doe", "password": "password123"}'
$token = $loginResponse.token
Write-Host "Received Token:"
Write-Host $token.Substring(0, 20) "..." -ForegroundColor Yellow 

# 2. Access Profile (Authorized)
Write-Host "`n--- 2. Accessing Profile with John's Token ---" -ForegroundColor Cyan
try {
    $profile = Invoke-RestMethod -Uri "http://localhost:3000/profile" -Method Get -Headers @{ Authorization = "Bearer $token" }
    Write-Host "Success! Response:" -ForegroundColor Green
    Write-Host ($profile | ConvertTo-Json)
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Access Admin Panel (Unauthorized for User)
Write-Host "`n--- 3. Accessing Admin Panel with John's Token ---" -ForegroundColor Cyan
try {
    $admin = Invoke-RestMethod -Uri "http://localhost:3000/admin" -Method Get -Headers @{ Authorization = "Bearer $token" }
    Write-Host "Success! Response:" -ForegroundColor Green
    Write-Host ($admin | ConvertTo-Json)
} catch {
    # We expect this to fail
    Write-Host "Blocked! (As expected). Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# 4. Login as 'Admin Jane'
Write-Host "`n--- 4. Logging in as 'admin_jane' ---" -ForegroundColor Cyan
$adminResponse = Invoke-RestMethod -Uri "http://localhost:3000/login" -Method Post -ContentType "application/json" -Body '{"username": "admin_jane", "password": "adminpassword"}'
$adminToken = $adminResponse.token

# 5. Access Admin Panel (Authorized for Admin)
Write-Host "`n--- 5. Accessing Admin Panel with Admin's Token ---" -ForegroundColor Cyan
try {
    $adminData = Invoke-RestMethod -Uri "http://localhost:3000/admin" -Method Get -Headers @{ Authorization = "Bearer $adminToken" }
    Write-Host "Success! Response:" -ForegroundColor Green
    Write-Host ($adminData | ConvertTo-Json)
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
