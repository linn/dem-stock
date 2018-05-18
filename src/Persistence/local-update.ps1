$env:DATABASE_HOST='localhost'
$env:DATABASE_NAME='dem-stock'
$env:DATABASE_USER_ID='dem-stock'
$env:DATABASE_PASSWORD='dem-stock'

dotnet ef database update
