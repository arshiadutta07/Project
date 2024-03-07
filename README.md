# Blog Post Application API

This project is a Blog Post Application API developed using Node.js and Express.js. MongoDB is used as the database, with Mongoose as the Object-Relational Mapping (ORM) tool. JSON Web Tokens (JWT) are employed for authentication, and JOI validation ensures data integrity. Passwords are hashed using bcrypt for security.

## Features

- User authentication with JWT
- Signup and login APIs for user management
- CRUD APIs for managing blog posts

## Technologies Used

- **Node.js:** A JavaScript runtime for server-side development.
- **Express.js:** A web application framework for Node.js that simplifies API development.
- **MongoDB:** A NoSQL database used for storing data in a JSON-like format.
- **Mongoose:** An ORM tool for MongoDB and Node.js, providing a schema-based solution.
- **JWT (JSON Web Tokens):** Used for secure user authentication.
- **JOI Validation:** Ensures data validation and integrity.
- **Bcrypt:** Used for password hashing to enhance security.

## Installation

1. Clone the repository - 
2. Navigate to the project directory - cd directory.
3. Install dependencies - npm install.
4. Set up the MongoDB connection by configuring the .env file.
5. Run the application.
6. The API server will be running on http://localhost:4000.

## Project Structure
1. index.js is the main entry point for the project.
2. Collection Folder contains the Database Schema.
3. Middlewares Folder contains the auth middleware.
4. Validations Folder contains validations for each API.
5. DB Folder contains database connection.
6. Routes Folder contains API's for the application.
7. RoutesManagement Folder contains management files for every API.
8. package.json contains dependencies.
