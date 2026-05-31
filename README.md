# URL Shortener

A simple Node.js URL shortening service with user authentication, link analytics, and MongoDB persistence

## Features

- User signup and login
- Generate shortened URLs
- Redirect to original URL via short ID
- Track clicks and visit history
- Protected URL creation for authenticated users
- EJS-based views for login, signup, and home pages

## Tech Stack

- Node.js
- Express
- MongoDB via Mongoose
- EJS templates
- JSON Web Tokens for authentication
- cookie-parser
- nanoid for short URL generation

## Requirements

- Node.js 18+ (or compatible)
- MongoDB running locally

## Setup

1. Clone the repository or copy the project files.
2. Install dependencies:

```bash
npm install
```

3. Start MongoDB locally.
4. Run the application:

```bash
npm start
```

## Usage

- Open `http://localhost:8001`
- Signup for a new account or login with existing credentials
- Create a new shortened URL from the home page
- Use the shortened link to redirect to the original URL
- View analytics for a generated URL at `/url/analytics/:shortId`

## Project Structure

- `index.js` - Application entry point
- `connect.js` - MongoDB connection helper
- `controllers/` - Request handlers for URLs and users
- `routes/` - Express route definitions
- `models/` - Mongoose models
- `middlewares/` - Authentication middleware
- `service/` - JWT token handling
- `views/` - EJS templates

## Notes

- The app listens on port `8001` and connects to MongoDB at `mongodb://localhost:27017/urlshortener`.
- Authentication uses a JWT secret defined in `service/auth.js`.


