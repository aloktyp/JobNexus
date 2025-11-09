# 🚀 JobNexus - Modern Job Portal Platform

<div align="center">

![JobNexus](https://img.shields.io/badge/JobNexus-Connects%20Companies%20%26%20Talent-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=flat-square&logo=mongodb)

**✨ Connects Companies & Talent ✨**

🌐 **[Live Demo](https://jobnexus-frontend.onrender.com)** | 🔗 **[Backend API](https://jobnexus-backend-8dll.onrender.com)**

</div>

---

## 📋 About

JobNexus is a full-stack job portal application that connects talented professionals with companies. Built with modern technologies, it offers a seamless experience for both job seekers and recruiters.

### ✨ Key Features

#### For Job Seekers (Students)
- 🔍 **Smart Job Search** - Search and filter jobs by location, industry, and salary
- 💾 **Save Jobs** - Bookmark interesting opportunities for later
- 📝 **Easy Applications** - Apply to jobs with one click
- 👤 **Profile Management** - Upload resume, profile picture, and showcase skills
- 🎨 **5 Beautiful Themes** - Personalize your experience

#### For Recruiters
- 📢 **Post Jobs** - Create and manage job listings
- 🏢 **Company Management** - Register and manage company profiles
- 👥 **View Applicants** - Review applications and candidate profiles
- 📊 **Dashboard** - Track all your job postings

#### General Features
- 🔐 **Secure Authentication** - JWT-based auth with role management
- 🎨 **Theme Switcher** - 5 stunning themes (Purple, Ocean, Sunset, Forest, Rose)
- 📱 **Responsive Design** - Works perfectly on all devices
- ☁️ **Cloud Storage** - Images stored on Cloudinary
- 🚀 **Fast & Modern** - Built with React + Vite

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File uploads

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aloktyp/JobNexus.git
   cd JobNexus
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   MONGO_URI=your_mongodb_uri
   SECRET_KEY=your_secret_key
   PORT=3000
   CLOUD_NAME=your_cloudinary_name
   API_KEY=your_cloudinary_key
   API_SECRET=your_cloudinary_secret
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the Application**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (in new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open** http://localhost:5173

---

## 🌐 Live Deployment

The application is deployed and live:

- **Frontend**: [https://jobnexus-frontend.onrender.com](https://jobnexus-frontend.onrender.com)
- **Backend API**: [https://jobnexus-backend-8dll.onrender.com](https://jobnexus-backend-8dll.onrender.com)

Both frontend and backend are hosted on **Render**.

---

## 🎨 Themes

JobNexus comes with 5 beautiful themes:

1. **Purple Dream** 💜 - Creative and modern
2. **Ocean Blue** 🌊 - Professional and calming
3. **Sunset Orange** 🌅 - Energetic and vibrant
4. **Forest Green** 🌲 - Fresh and natural
5. **Rose Pink** 🌸 - Elegant and stylish

Switch themes using the palette button in the bottom-right corner!

---

## 📸 Screenshots

### Home Page
Beautiful hero section with search functionality

### Job Listings
Grid view with filters and save options

### Profile Management
Upload resume, profile picture, and manage skills

### Theme Switcher
5 stunning themes to choose from

---

## 🗂️ Project Structure

```
JobNexus/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth & file upload
│   ├── utils/           # Helper functions
│   └── index.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── contexts/    # Theme context
│   │   ├── redux/       # State management
│   │   ├── hooks/       # Custom hooks
│   │   └── utils/       # Utilities
│   └── public/          # Static assets
└── README.md
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=              # MongoDB connection string
SECRET_KEY=             # JWT secret key
PORT=3000              # Server port
CLOUD_NAME=            # Cloudinary cloud name
API_KEY=               # Cloudinary API key
API_SECRET=            # Cloudinary API secret
```

### Frontend (.env)
```env
VITE_USER_API_END_POINT=
VITE_JOB_API_END_POINT=
VITE_APPLICATION_API_END_POINT=
VITE_COMPANY_API_END_POINT=
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Alok Kumar**

- GitHub: [@aloktyp](https://github.com/aloktyp)
- Project: [JobNexus](https://github.com/aloktyp/JobNexus)

---

## 🙏 Acknowledgments

- React Team for the amazing library
- MongoDB for the database
- Cloudinary for image storage
- All contributors and users

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Visit the live demo: [JobNexus](https://jobnexus-frontend.onrender.com)

---

<div align="center">

**Made with ❤️ by Alok**

⭐ Star this repo if you find it helpful!

</div>
