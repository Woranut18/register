package main

import (
	"database/sql"
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
	_ "github.com/lib/pq"
)

func main() {
	fmt.Println("🌱 Seeding database...")

	connStr := "postgres://postgres:password_jel@localhost:5432/hospital?sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("❌ Failed to connect DB:", err)
	}
	defer db.Close()

	// สร้างตาราง
	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		role TEXT CHECK (role IN ('doctor', 'staff')) NOT NULL
	);
	`)
	if err != nil {
		log.Fatal("❌ Failed to create table:", err)
	}

	// เข้ารหัส password ด้วย bcrypt
	passwordDoctor, _ := bcrypt.GenerateFromPassword([]byte("1234"), bcrypt.DefaultCost)
	passwordStaff, _ := bcrypt.GenerateFromPassword([]byte("5678"), bcrypt.DefaultCost)

	// Insert users
	_, err = db.Exec(`
	INSERT INTO users (username, password, role) VALUES
		('doctor1', $1, 'doctor'),
		('staff1', $2, 'staff')
	ON CONFLICT (username) DO NOTHING;
	`, passwordDoctor, passwordStaff)

	if err != nil {
		log.Fatal("❌ Failed to insert data:", err)
	}

	fmt.Println("✅ Seeding complete with bcrypt password.")
}
