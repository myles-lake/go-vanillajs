package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"frontendmasters.com/reelingit/data"
	"frontendmasters.com/reelingit/handlers"
	"frontendmasters.com/reelingit/logger"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")

	if err != nil {
		log.Fatalf(`Failed to initialize logger %v`, err)
	}

	defer logInstance.Close()
	return logInstance
}

func main() {
	logInstance := initializeLogger()

	if err := godotenv.Load(); err != nil {
		log.Fatal("No .env file was available")
	}

	dbConnStr := os.Getenv("DATABASE_URL")

	if dbConnStr == "" {
		log.Fatal("DATABASE_URL not set")
	}

	db, err := sql.Open("postgres", dbConnStr)

	if err != nil {
		log.Fatalf("Failed to connect to the DB: %v", err)
	}

	defer db.Close()

	movieRepo, err := data.NewMovieRepository(db, logInstance)
	movieHandler := handlers.NewMovieHandler(movieRepo, logInstance)

	if err != nil {
		log.Fatal("Failed to initialize repository.")
	}

	http.HandleFunc("/api/movies/top/", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random/", movieHandler.GetRandomMovies)
	http.HandleFunc("/api/movies/search/", movieHandler.SearchMovies)
	http.HandleFunc("/api/movies/", movieHandler.GetMovie)
	http.HandleFunc("/api/genres/", movieHandler.GetGenres)

	http.Handle("/", http.FileServer(http.Dir("public")))

	fmt.Println("Serving the files")

	const addr = ":8080"
	errs := http.ListenAndServe(addr, nil)

	if errs != nil {
		log.Fatalf("Server failed: %v", err)
		logInstance.Error("Server failed", err)
	}
}
