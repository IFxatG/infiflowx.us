# Cloudflare Pages Deployment Guide

## ✅ Setup Complete!

Your Next.js app is now configured for Cloudflare Pages deployment using **OpenNext**.

## 📦 What Was Configured

### 1. **OpenNext Adapter**
- Installed `open-next` package (v3.1.3)
- Created `open-next.config.ts` with Cloudflare edge configuration
- Updated build scripts in `package.json`

### 2. **Build Configuration**
- **Build command**: `npm run pages:build`
- **Output directory**: `.open-next/worker`
- **Wrangler config**: `wrangler.toml` configured for Cloudflare Pages

### 3. **Next.js Version**
- Using Next.js 15.5.9 (latest)
- Compatible with OpenNext Cloudflare adapter

## 🚀 Deployment Options

### **Option A: Deploy via Cloudflare Dashboard** (Recommended for first deploy)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure Cloudflare Pages deployment with OpenNext"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Connect your GitHub repository
   
3. **Configure Build Settings**:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.open-next/worker`
   - **Root directory**: `/` (leave as default)
   - **Node version**: `20.x` (set in Environment Variables)

4. **Add Environment Variables** (if needed):
   - `GOOGLE_GENAI_API_KEY` - Your Google AI API key (for Genkit)
   - Any other environment variables your app needs

5. **Deploy**: Click "Save and Deploy"

### **Option B: Deploy via Wrangler CLI**

1. **Login to Cloudflare**:
   ```bash
   npx wrangler login
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🧪 Local Testing

Test your Cloudflare build locally before deploying:

```bash
# Build for Cloudflare
npm run pages:build

# Preview locally
npm run preview
```

## ⚠️ Important Notes

### **Server Actions Support**
✅ Your app uses **Server Actions** (`getCashOfferAction` in `src/app/actions.ts`)
✅ OpenNext with edge converter supports Server Actions on Cloudflare

### **AI Flows (Genkit)**
⚠️ **Potential Limitation**: Cloudflare Workers have runtime constraints that may affect Genkit AI flows:
- Limited execution time (30 seconds for free tier, 15 minutes for paid)
- Edge runtime may not support all Node.js APIs used by Genkit
- Google AI API calls need to work within Cloudflare's fetch API

**Recommendation**: Test the AI flow thoroughly after deployment. If you encounter issues, consider:
1. Using Firebase App Hosting instead (already configured via `apphosting.yaml`)
2. Moving AI processing to a separate API endpoint on a full Node.js runtime

### **Environment Variables**
Make sure to add these in Cloudflare Pages Dashboard:
- `GOOGLE_GENAI_API_KEY` - For Genkit AI flows
- Any other API keys or secrets

## 🔄 Alternative: Deploy to Firebase App Hosting

Your app is **already configured** for Firebase App Hosting. If Cloudflare doesn't work well with Genkit:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

Firebase App Hosting provides:
- ✅ Full Node.js runtime (better for Genkit)
- ✅ Native Server Actions support
- ✅ No edge runtime limitations

## 📝 Build Scripts Reference

```json
{
  "pages:build": "open-next build --platform cloudflare",
  "preview": "npm run pages:build && wrangler pages dev .open-next/worker",
  "deploy": "npm run pages:build && wrangler pages deploy .open-next/worker"
}
```

## 🐛 Troubleshooting

### Build fails in Cloudflare
- Check build logs in Cloudflare Dashboard
- Verify environment variables are set
- Ensure Node version is set to 20.x

### Server Actions not working
- Verify OpenNext config uses `converter: 'edge'`
- Check Cloudflare Pages function logs

### AI flows timeout or fail
- Consider increasing Cloudflare Workers timeout (paid plan)
- Or migrate to Firebase App Hosting for full Node.js runtime

## 📚 Resources

- [OpenNext Documentation](https://opennext.js.org/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

---

**Ready to deploy!** 🚀

Choose your deployment method above and get your app live!
