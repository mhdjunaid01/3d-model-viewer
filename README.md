#  3D Model Viewer Web Application

A full-stack MERN application that allows users to upload and view 3D models in GLB format. The application includes a dashboard for uploading models, displays them using Three.js and @react-three/fiber, stores metadata and links in MongoDB, and is fully deployed on the cloud.

---

##  Features

- 📤 Upload 3D `.glb` model files to Cloudinary
- 🧠 View interactive 3D models using React Three Fiber
- 🌐 Hosted frontend and backend
- 🔒 Environment-based configuration with `.env`
- ☁️ MongoDB Atlas and Cloudinary integration
- ⚛️ Built with React, Node.js, Express, MongoDB

---

##  Live Demo

- **Frontend (Vercel)**: [https://3d-viewer-gamma.vercel.app](https://3d-viewer-gamma.vercel.app)
- **Backend (Render)**: [https://threed-backend-1bty.onrender.com](https://threed-backend-1bty.onrender.com)

---

## Video Walkthrough

- [Watch the Loom video demo](https://www.loom.com/share/e032682fa4bf4446b96221be4e28785c)

---

## Tech Stack

| Frontend            | Backend               | Deployment        |
|---------------------|------------------------|-------------------|
| React + Vite        | Node.js + Express       | Vercel (Frontend) |
| React Three Fiber   | MongoDB + Mongoose      | Render (Backend)  |
| @react-three/drei   | Cloudinary (File Upload)|                   |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas
- Cloudinary Account

### Clone the repository
git clone https://github.com/mhdjunaid01/3d-model-viewer.git
cd 3d-model-viewer


---

## Local Development Setup

MongoDB Atlas is already connected in the deployed backend. You **do not need to configure the database locally unless you want to test locally**.

### Frontend Setup

cd client
npm install
# .env
VITE_API_URL=http://localhost:5000
npm run dev
cd server
npm install

# If you want to test locally, create .env:
MONGO_URL=<your_mongo_uri>         # MongoDB Atlas or local URI
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

npm start

Deployment
## Frontend deployed on Vercel
## Backend hosted on Render

MongoDB Atlas used as cloud database

Cloudinary used for file storage

 Author
Muhammed Junaid M
muhammedjunaid2016@gmail.com

