# Cloudflare Pages Deployment Guide for An Jia You Xuan

This guide will walk you through deploying the An Jia You Xuan real estate website to Cloudflare Pages (frontend) and Namecheap shared hosting (WordPress backend).

## 1. WordPress Backend Deployment (Namecheap)

### 1.1 Prepare WordPress Files
- Export your local WordPress database
- Collect your WordPress theme files and plugins

### 1.2 Set Up Namecheap Hosting
- Log in to your Namecheap account
- Navigate to your hosting dashboard
- Set up a new database for WordPress

### 1.3 Upload WordPress Files
- Use FTP (FileZilla or similar) to upload WordPress files to your hosting
- Upload the database via phpMyAdmin
- Configure wp-config.php with your new database credentials

### 1.4 Upload Custom PHP Files
Move these PHP files to your WordPress theme directory:
- setup-property-duplicate.php
- setup-property-post-type.php
- setup-ai-description.php
- setup-amenities.php
- setup-property-api.php
- setup-property-features.php
- setup-property-fields.php
- setup-property-type.php
- functions.php

### 1.5 Configure WordPress Settings
- Set up permalinks (Settings > Permalinks > Post name)
- Enable REST API (should be enabled by default)
- Configure CORS headers to allow your frontend domain

## 2. Next.js Frontend Deployment (Cloudflare Pages)

### 2.1 Create a GitHub Repository
- Create a new GitHub repository
- Push your Next.js project to the repository
- Make sure to exclude node_modules and .next directories in .gitignore

### 2.2 Connect to Cloudflare Pages
- Log in to Cloudflare dashboard
- Go to Pages > Create a project
- Connect your GitHub account and select your repository
- Configure build settings:
  - Framework preset: Next.js
  - Build command: npm run build
  - Build output directory: .next
  - Node.js version: 20.x

### 2.3 Configure Environment Variables
Add these environment variables in the Cloudflare Pages dashboard:
- DEEPSEEK_API_KEY: Your DeepSeek API key
- NEXT_PUBLIC_WORDPRESS_API_URL: https://your-wordpress-domain.com/wp-json

### 2.4 Deploy Your Site
- Click "Save and Deploy"
- Wait for the build to complete
- Your site will be available at https://your-project-name.pages.dev

### 2.5 Configure Custom Domain
- In Cloudflare Pages, go to your project > Custom domains
- Add your custom domain
- Update DNS settings as instructed by Cloudflare

## 3. Connect Frontend and Backend

### 3.1 Update API URL in Production
- Make sure your .env.production file has the correct WordPress API URL
- Verify the redirect in cloudflare.toml points to your WordPress domain

### 3.2 Test the Connection
- Visit your deployed frontend site
- Verify that it can fetch data from your WordPress backend
- Check for any CORS errors in the browser console

## 4. Optimization Tips

### 4.1 Batch Content Updates
To avoid exceeding the Cloudflare Pages free tier (500 builds/month):
- Batch your content updates
- Use WordPress drafts for work-in-progress content
- Implement ISR (Incremental Static Regeneration) for dynamic content

### 4.2 Build Optimization
- Properly configure .gitignore
- Use Next.js build cache
- Minimize dependencies
- Implement dynamic imports for large components

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Add these headers to your WordPress .htaccess file:
```
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
  Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
</IfModule>
```

### Build Failures
If your build fails on Cloudflare Pages:
1. Check build logs for errors
2. Verify Node.js version compatibility
3. Ensure all dependencies are properly installed

### API Connection Issues
If the frontend can't connect to WordPress:
1. Verify the WordPress API URL is correct
2. Check that the REST API is enabled in WordPress
3. Test the API endpoint directly in a browser
