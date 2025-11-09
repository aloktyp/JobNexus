# Complete Setup Guide - Job Portal Application

Follow these steps carefully to set up and run the job portal application.

---

## Step 1: MongoDB Setup

You have two options for MongoDB:

### Option A: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Click "Build a Database" → Choose "FREE" tier
4. Select a cloud provider and region (choose one closest to you)
5. Click "Create Cluster" (takes 3-5 minutes)
6. Create a database user:
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `jobportal_user` (or any name you prefer)
   - Password: Click "Autogenerate Secure Password" and **SAVE IT**
   - User Privileges: Select "Read and write to any database"
   - Click "Add User"
7. Whitelist your IP address:
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development only)
   - Click "Confirm"
8. Get your connection string:
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/`)
   - **Replace `<password>` with your actual password**
   - Add database name at the end: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jobportal`

### Option B: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer (.msi file)
3. Choose "Complete" installation
4. Install MongoDB as a Service (check the box)
5. Install MongoDB Compass (GUI tool) when prompted
6. After installation, MongoDB runs automatically
7. Your connection string: `mongodb://localhost:27017/jobportal`

**To verify MongoDB is running:**
- Open Command Prompt and type: `mongod --version`
- Or open MongoDB Compass and connect to `mongodb://localhost:27017`

---

## Step 2: Cloudinary Setup (For Image Uploads)

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. After login, you'll see your dashboard
4. Find your credentials in the "Account Details" section:
   - **Cloud Name**: (e.g., `dxxxxx`)
   - **API Key**: (e.g., `123456789012345`)
   - **API Secret**: Click the eye icon to reveal (e.g., `abcdefghijklmnopqrstuvwxyz`)
5. **Copy these three values** - you'll need them in the next step

---

## Step 3: Configure Environment Variables

1. Open the file: `jobportal-yt-main/backend/.env`

2. Update it with your actual credentials:

```env
# MongoDB Connection
# If using MongoDB Atlas, paste your connection string here
# If using local MongoDB, use: mongodb://localhost:27017/jobportal
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/jobportal

# JWT Secret Key - Generate a random secure string
# You can use any random string, or generate one at: https://randomkeygen.com/
SECRET_KEY=your_super_secret_random_key_min_32_characters_long

# Server Port
PORT=3000

# Cloudinary Configuration (paste your values from Cloudinary dashboard)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

**Example of a properly configured .env file:**
```env
MONGO_URI=mongodb+srv://jobportal_user:MyPass123@cluster0.ab1cd.mongodb.net/jobportal
SECRET_KEY=8f3b2a9c7e1d4f6a8b2c9e7f1a3d5b8c9e2f4a6b8d1c3e5f7a9b2d4e6f8a1c3e5
PORT=3000
CLOUD_NAME=dxyz123abc
API_KEY=123456789012345
API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

---

## Step 4: Generate a Secure SECRET_KEY

Choose one method:

**Method 1: Using Node.js (Recommended)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Method 2: Using PowerShell**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Method 3: Online Generator**
- Visit: https://randomkeygen.com/
- Copy any "CodeIgniter Encryption Keys" value

Copy the generated key and paste it as your `SECRET_KEY` in the `.env` file.

---

## Step 5: Install Dependencies (Already Done)

✅ Dependencies are already installed. If you need to reinstall:

```bash
# Backend
cd jobportal-yt-main/backend
npm install

# Frontend
cd jobportal-yt-main/frontend
npm install
```

---

## Step 6: Run the Application

### Start Backend Server

1. Open a terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd jobportal-yt-main/backend
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. You should see:
   ```
   Server running at port 3000
   mongodb connected successfully
   ```

**If you see errors:**
- "MongooseError": Check your MONGO_URI in .env file
- "EADDRINUSE": Port 3000 is already in use, change PORT in .env
- "Invalid Cloudinary credentials": Check your Cloudinary credentials

### Start Frontend Application

1. Open a **NEW** terminal/command prompt (keep backend running)
2. Navigate to frontend folder:
   ```bash
   cd jobportal-yt-main/frontend
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

5. Open your browser and go to: **http://localhost:5173**

---

## Step 7: Verify Everything Works

1. **Backend**: Should show "Server running at port 3000" and "mongodb connected successfully"
2. **Frontend**: Should open in browser at http://localhost:5173
3. **Database**: Check MongoDB Compass or Atlas - you should see the "jobportal" database

---

## Troubleshooting

### Backend won't start
- Check if MongoDB is running (for local installation)
- Verify MONGO_URI is correct in .env
- Make sure port 3000 is not in use

### Frontend won't start
- Make sure port 5173 is not in use
- Try deleting `node_modules` and running `npm install` again

### Can't connect to MongoDB Atlas
- Check if your IP is whitelisted in Network Access
- Verify username and password in connection string
- Make sure you replaced `<password>` with actual password

### Images won't upload
- Verify Cloudinary credentials in .env
- Check if CLOUD_NAME, API_KEY, and API_SECRET are correct

---

## Quick Reference

**Backend URL**: http://localhost:3000
**Frontend URL**: http://localhost:5173
**API Base**: http://localhost:3000/api/v1

**Stop servers**: Press `Ctrl + C` in the terminal

---

## Next Steps

Once everything is running:
1. Create a user account on the frontend
2. Test login functionality
3. Explore the job portal features

Need help? Check the error messages in the terminal for clues!
