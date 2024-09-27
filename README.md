# Monde de dev - Minimum Viable Project

This is a Minimum Viable Project for **Monde de Dev**, a social network specialised in tech, adressed to web developers.

## Prerequisites

- Angular 17
- Java 21
- NodeJS
- PostgreSQL

## Setting up the project

### Installing the back-end

Run `mvn install` (or `mvn package`) to install all dependencies. Run `mvn spring-boot:run` to run the API (default port: 8080)

### Installing the database

1. Create your database

Log into PostgreSQL:

```
psql -U postgres
```

Create the database and user:

```sql
CREATE DATABASE your_database_name;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;
```

2. Configure your database connection

Create a `.env` file in `/back` to match database configuration set in `application.yml` and root to store your database credentials

```
DB_URL=jdbc:postgresql://localhost:5432/your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

3. Connect your database

Ensure PostgreSQL is running:

```bash
sudo service postgresql start  # Ubuntu
brew services start postgresql # macOS
```

The Spring Boot application will automatically connect to the database using the credentials in the .env file when you run the backend:

```
mvn spring-boot:run
```

### Installing the front end

1. Navigate to the front folder with `cd /front`
2. Run `npm install` to install the `/node_modules` and dependencies
3. Run `ng serve` for a dev server.
4. Navigate to `http://localhost:4200/`.

> The application will automatically reload if you change any of the source files.

## Further help

- **Angular CLI**: use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
- **Angular Material**: [Check documentation](https://material.angular.io/)
