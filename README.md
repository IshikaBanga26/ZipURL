# ZipURL

A full-stack URL shortener built with the MERN stack. Convert long URLs into clean, shareable short links with expiration control and click tracking.

---

## Live Demo

- **Frontend:** [zipurl-1ot.pages.dev](https://zipurl-1ot.pages.dev)
- **Backend API:** [zipurl-ciac.onrender.com](https://zipurl-ciac.onrender.com)

---

## Features

- URL shortening with unique short IDs generated via nanoid
- Link expiration — set expiry of 1 hour, 24 hours, 7 days, or 30 days
- Click tracking — every redirect increments the click counter
- URL validation — invalid URLs are rejected before shortening
- Copy to clipboard — one-click copy of shortened links
- Session history — view last 10 shortened links

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Vite | Build tool |
| CSS3 | Styling |
| Cloudflare Pages | Deployment |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| nanoid | Short ID generation |
| cors | Cross-origin requests |
| dotenv | Environment variables |
| Render | Deployment |

---

## Project Structure

```
ZipURL/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── Url.js                # Business logic
├── models/
│   └── url.js                # Mongoose schema
├── routes/
│   └── apiRoutes.js          # API routes
├── services/
│   └── urlValidation.js      # URL validation helper
├── zipurl-frontend/          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── public/
│   │   └── _redirects        # Cloudflare SPA routing
│   └── vite.config.js
├── index.js                  # Entry point
├── .env                      # Environment variables (not committed)
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js v20+
- MongoDB Atlas account

### Installation

1. Clone the repository

```bash
git clone https://github.com/IshikaBanga26/ZipURL.git
cd ZipURL
```

2. Install backend dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```env
PORT=5000
MONGO_URI=mongodb://your_connection_string
```

4. Install frontend dependencies

```bash
cd zipurl-frontend
npm install
```

5. Run the backend

```bash
nodemon index.js
```

6. Run the frontend in a separate terminal

```bash
cd zipurl-frontend
npm run dev
```

7. Open in browser

```
http://localhost:5173
```

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/url/shorten` | Shorten a URL |
| GET | `/:shortId` | Redirect to original URL |
| GET | `/api/url/stats/:shortId` | Get click stats for a URL |

### POST `/api/url/shorten`

Request body:
```json
{
  "originalUrl": "https://your-long-url.com",
  "expiresIn": 24
}
```

Response:
```json
{
  "shortUrl": "https://zipurl-ciac.onrender.com/abc123xyz",
  "expiresAt": "2024-01-02T10:00:00.000Z"
}
```

### GET `/api/url/stats/:shortId`

Response:
```json
{
  "originalUrl": "https://your-long-url.com",
  "shortId": "abc123xyz",
  "clicks": 42,
  "createdAt": "2024-01-01T10:00:00.000Z",
  "expiresAt": null
}
```

---

## Deployment

### Backend — Render

1. Connect GitHub repository to Render
2. Add environment variables: `MONGO_URI`, `PORT`
3. Build command: `npm install`
4. Start command: `node index.js`

### Frontend — Cloudflare Pages

1. Connect GitHub repository to Cloudflare Pages
2. Root directory: `zipurl-frontend`
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Build output directory: `dist`

---

## Upcoming Features

- Analytics — country and device tracking per click
- Smart redirect rules — device-based routing
- User authentication — personal link dashboard
- Visual analytics dashboard with click charts

---

## Author

**Ishika Banga**
GitHub: [@IshikaBanga26](https://github.com/IshikaBanga26)

---

## License

This project is open source and available under the [MIT License](LICENSE).
