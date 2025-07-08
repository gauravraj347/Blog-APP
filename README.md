# Blog Website with Rich Text Input and MongoDB Integration

A full-stack blog platform with admin dashboard, rich text editing, SEO-friendly URLs, and MongoDB backend.

## Features

- Admin dashboard for CRUD operations
- Rich text editor (Quill)
- SEO-friendly slugs and meta tags
- MongoDB integration via Mongoose
- Dynamic post viewing by slug
- Secure admin authentication (API key)
- Responsive, modern UI

## Tech Stack

- **Frontend:** Next.js, React, React-Quill
- **Backend:** Express.js, Mongoose, MongoDB

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd blog
   ```
2. **Backend setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file with:
   # MONGODB_URI=your_mongodb_connection_string
   # ADMIN_API_KEY=your_admin_api_key
   npm run dev
   ```
3. **Frontend setup:**
   ```bash
   cd ../frontend
   npm install
   # Create a .env file with:
   # NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   # NEXT_PUBLIC_ADMIN_API_KEY=your_admin_api_key
   npm run dev
   ```

### Seeding Demo Data

To populate demo posts:

```bash
cd backend
node seed.js
```

## Usage

- Visit `http://localhost:3000` for the blog.
- Use the "Admin Dashboard" button to manage posts (requires API key).

## Deployment

- Frontend: Deploy to Vercel or similar.
- Backend: Deploy to your preferred Node.js host.
- Database: Use MongoDB Atlas for cloud storage.

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
