<!-- Khởi tạo container có tên là postgres-nest với port là 5432 pass là postgres-->

docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
