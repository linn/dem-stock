Open bash and go to persistence folder
cd /c/projects/dem-stock/src/Persistence

Make Migration
dotnet ef migrations add first-thing -o Migrations

export DATABASE_HOST='localhost'
export DATABASE_NAME='dem-stock'
export DATABASE_USER_ID='dem-stock'
export DATABASE_PASSWORD='dem-stock'

(or in Powershell $env:DATABASE_HOST = 'localhost' etc...)

Apply Migration
dotnet ef database update first-thing