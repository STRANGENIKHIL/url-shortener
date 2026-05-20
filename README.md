# URL Shortener Microservice

A fast and efficient URL shortening service built with Node.js and Express. This service generates short, unique IDs for long URLs and redirects users to the original destination when the short URL is accessed.

## Features

- **Generate Short URLs**: Create short IDs for long URLs.
- **URL Redirection**: Automatically redirect users from short URLs to the original URLs.
- **Analytics**: Track visit history and click counts for each URL.

## Tech Stack

- **Node.js** - JavaScript runtime for server-side applications.
- **Express.js** - Web framework for building APIs.
- **MongoDB** - NoSQL database for storing URL data.
- **Nanoid** - Library for generating unique IDs.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or accessible remotely)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Start the Server

Run the application using `nodemon`:

```bash
npm start
```

The server will start on `http://localhost:8001`.

### API Endpoints

#### 1. Create Short URL

**Endpoint:** `POST /url`

**Description:** Generates a short ID for a given URL.

**Request Body:**

```json
{
  "url": "https://example.com/very-long-url-to-shorten"
}
```

**Response:**

```json
{
  "id": "uniqueId"
}
```

#### 2. Get Analytics

**Endpoint:** `GET /analytics/:id`

**Description:** Retrieves analytics data for a specific short URL.

**URL Parameters:**

- `id`: The short ID of the URL (e.g., `uniqueId`).

**Response:**

```json
{
  "totalClicks": 15,
  "analytics": [
    { "timestamp": 1716123456789 }
  ]
}
```

### Redirect to Original URL

Any request to `http://localhost:8001/:shortId` will redirect to the original URL:

```
GET /uniqueIdd  ->  Redirects to https://example.com/very-long-url-to-shorten
```

## Project Structure

```
url-shortener/
├── controllers/
│   └── url_controller.js  # Handles business logic
├── models/
│   └── url.js              # Mongoose schema for URL
├── routes/
│   └── url_routes.js       # API route definitions
├── connect.js              # MongoDB connection
├── index.js                # Express application entry point
└── package.json            # Project dependencies and scripts
```

## Environment Variables

Create a `.env` file in the root directory (optional):

```env
MONGO_URI=mongodb://localhost:27017/urlshortener
```

## License

ISC
