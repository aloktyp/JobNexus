# 📋 Deployment Checklist

Quick checklist to ensure smooth deployment.

## Before Deployment

- [ ] MongoDB Atlas is set up and accessible
- [ ] Cloudinary account is configured
- [ ] All environment variables are documented
- [ ] Code is pushed to GitHub
- [ ] `.env` files are in `.gitignore`

## Backend Deployment (Render)

- [ ] Create new Web Service on Render
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Add all environment variables:
  - [ ] MONGO_URI
  - [ ] SECRET_KEY
  - [ ] PORT
  - [ ] CLOUD_NAME
  - [ ] API_KEY
  - [ ] API_SECRET
  - [ ] NODE_ENV=production
- [ ] Deploy and wait for completion
- [ ] Copy backend URL
- [ ] Test backend health: `https://your-backend.onrender.com/api/v1/user`

## Frontend Deployment (Vercel)

- [ ] Update `frontend/src/utils/constant.js` with environment variables
- [ ] Create `.env` file with backend URL
- [ ] Push changes to GitHub
- [ ] Create new project on Vercel
- [ ] Set Root Directory to `frontend`
- [ ] Add environment variables (VITE_*_API_END_POINT)
- [ ] Deploy and wait for completion
- [ ] Copy frontend URL

## Post-Deployment

- [ ] Update backend CORS with frontend URL
- [ ] Push CORS changes to GitHub
- [ ] Wait for Render auto-redeploy
- [ ] Test complete user flow:
  - [ ] Sign up
  - [ ] Login
  - [ ] Post job (recruiter)
  - [ ] Browse jobs
  - [ ] Apply to job
  - [ ] Save job
  - [ ] Update profile
  - [ ] Upload images
  - [ ] Switch themes

## URLs to Save

- **Frontend**: ___________________________
- **Backend**: ___________________________
- **GitHub Repo**: ___________________________

## Common Issues

1. **CORS Error**: Update backend CORS origin
2. **API 404**: Check environment variables
3. **Slow first load**: Render free tier wakes up from sleep
4. **Images not uploading**: Check Cloudinary credentials

---

✅ **Deployment Complete!** Share your live URL! 🎉
