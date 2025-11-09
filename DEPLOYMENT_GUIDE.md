# 🚀 JobNexus Deployment Guide

Complete guide to deploy your JobNexus application on Render (Backend) and Vercel (Frontend).

---

## 📋 Prerequisites

- GitHub account
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- MongoDB Atlas database (already set up)
- Cloudinary account (already set up)

---

## Part 1: Deploy Backend on Render

### Step 1: Prepare Backend for Deployment

1. **Update CORS settings** in `backend/index.js`:
   - You'll need to update the CORS origin after deploying frontend
   - For now, we'll allow all origins temporarily

2. **Push code to GitHub**:
   ```bash
   cd jobportal-yt-main
   git init
   git add .
   git commit -m "Initial commit - JobNexus"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**:
   - Click "Connect account" if not connected
   - Select your JobNexus repository

4. **Configure the service**:
   - **Name**: `jobnexus-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: `Free`

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable" and add these:

   ```
   MONGO_URI=mongodb+srv://alok:KxOBMo6Io1YNyOWQ@cluster0.d7pvkyr.mongodb.net/jobportal?appName=Cluster0
   SECRET_KEY=4b6f74eb26b649362c48ab7a8db18dcc04fe58a79e2af32ead15c350f13d1881
   PORT=3000
   CLOUD_NAME=dyyhfukp5
   API_KEY=573395439818181
   API_SECRET=eLF27zTv3xmIoAiXyb-wK-hGsgk
   NODE_ENV=production
   ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes)

8. **Copy your backend URL**: 
   - It will be something like: `https://jobnexus-backend.onrender.com`
   - **SAVE THIS URL** - you'll need it for frontend!

### Step 3: Update Backend CORS

After getting your frontend URL (in Part 2), update `backend/index.js`:

```javascript
const corsOptions = {
    origin: 'https://your-frontend-url.vercel.app', // Update this
    credentials: true
}
```

Then commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will automatically redeploy.

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Update API Endpoints

1. **Create `.env` file** in `frontend` folder:
   ```bash
   cd frontend
   ```

2. **Create `.env` file** with your backend URL:
   ```env
   VITE_USER_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/user
   VITE_JOB_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/job
   VITE_APPLICATION_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/application
   VITE_COMPANY_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/company
   ```
   
   **Replace `jobnexus-backend.onrender.com` with your actual Render backend URL!**

3. **Update `frontend/src/utils/constant.js`** to use environment variables:
   ```javascript
   export const USER_API_END_POINT = import.meta.env.VITE_USER_API_END_POINT || "http://localhost:3000/api/v1/user";
   export const JOB_API_END_POINT = import.meta.env.VITE_JOB_API_END_POINT || "http://localhost:3000/api/v1/job";
   export const APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API_END_POINT || "http://localhost:3000/api/v1/application";
   export const COMPANY_API_END_POINT = import.meta.env.VITE_COMPANY_API_END_POINT || "http://localhost:3000/api/v1/company";
   ```

4. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update API endpoints for production"
   git push
   ```

### Step 2: Deploy on Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**:
   - Click "Import" next to your JobNexus repository

4. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   VITE_USER_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/user
   VITE_JOB_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/job
   VITE_APPLICATION_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/application
   VITE_COMPANY_API_END_POINT=https://jobnexus-backend.onrender.com/api/v1/company
   ```
   
   **Replace with your actual backend URL!**

6. **Click "Deploy"**

7. **Wait for deployment** (2-5 minutes)

8. **Copy your frontend URL**: 
   - It will be something like: `https://jobnexus.vercel.app`

### Step 3: Update Backend CORS (Important!)

1. Go back to your code and update `backend/index.js`:
   ```javascript
   const corsOptions = {
       origin: 'https://jobnexus.vercel.app', // Your actual Vercel URL
       credentials: true
   }
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS with frontend URL"
   git push
   ```

3. Render will automatically redeploy your backend

---

## Part 3: Final Testing

### Test Your Deployed Application:

1. **Visit your Vercel URL**: `https://your-app.vercel.app`

2. **Test these features**:
   - ✅ Sign up as a student
   - ✅ Sign up as a recruiter
   - ✅ Login
   - ✅ Post a job (as recruiter)
   - ✅ Browse jobs (as student)
   - ✅ Apply to jobs
   - ✅ Save jobs
   - ✅ Update profile
   - ✅ Upload profile picture
   - ✅ Theme switcher

3. **Check browser console** for any errors

---

## 🔧 Troubleshooting

### Issue: CORS Error
**Solution**: Make sure backend CORS origin matches your exact Vercel URL (including https://)

### Issue: API calls failing
**Solution**: 
- Check environment variables in Vercel dashboard
- Make sure backend URL is correct
- Check Render logs for backend errors

### Issue: Images not uploading
**Solution**: Verify Cloudinary credentials in Render environment variables

### Issue: Database connection failed
**Solution**: 
- Check MongoDB Atlas Network Access (should allow 0.0.0.0/0)
- Verify MONGO_URI in Render environment variables

### Issue: Backend sleeping (Render free tier)
**Solution**: 
- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid tier for production

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Backend sleeps after 15 min inactivity
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage

2. **Security**:
   - Never commit `.env` files to GitHub
   - Use environment variables for all secrets
   - Keep your MongoDB and Cloudinary credentials secure

3. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain → Add your domain

4. **Monitoring**:
   - Render: Check logs in dashboard
   - Vercel: Check deployment logs and analytics

---

## 🎉 Congratulations!

Your JobNexus application is now live! Share your URLs:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com

---

## 📞 Need Help?

If you encounter issues:
1. Check Render logs for backend errors
2. Check Vercel deployment logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Made with ❤️ by Alok**
