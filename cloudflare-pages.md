# Cloudflare Pages Deployment Guide

## Build Settings

When setting up your Cloudflare Pages project, use these exact settings:

### Build Configuration

- **Framework preset**: `None` or `Next.js (Static HTML Export)`
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (leave empty or set to `/`)

### Node.js Version

- **Node.js version**: `18` or `20` (set in Environment Variables if available)

### Environment Variables

No environment variables are required for this deployment.

## Verification Steps

1. **Check Build Logs**: After deployment, check the build logs to ensure:
   - Build completes successfully
   - Output directory contains `index.html`
   - No errors during build

2. **Verify Output**: The build should generate:
   - `out/index.html` (homepage)
   - `out/_redirects` (routing rules)
   - `out/_headers` (security headers)
   - All static pages in subdirectories

3. **Test Routes**: After deployment, test:
   - Homepage: `https://your-domain.pages.dev/`
   - About page: `https://your-domain.pages.dev/about/`
   - Contact page: `https://your-domain.pages.dev/contact/`

## Troubleshooting

### 404 Error on Homepage

If you see a 404 error:

1. **Verify Build Output Directory**: Ensure it's set to `out` (not `.next` or `dist`)
2. **Check Build Logs**: Look for any errors during the build process
3. **Verify index.html exists**: Check that `out/index.html` is present after build
4. **Clear Cache**: Cloudflare Pages may cache old builds - try redeploying

### Build Fails

If the build fails:

1. **Check Node Version**: Ensure Node.js 18+ is used
2. **Check Dependencies**: Run `npm install` locally to verify all dependencies install
3. **Check Build Logs**: Look for specific error messages

### Routes Not Working

If routes return 404:

1. **Check _redirects file**: Ensure `out/_redirects` exists and contains routing rules
2. **Verify trailing slashes**: All routes should end with `/` due to `trailingSlash: true`
3. **Check file structure**: Each route should have an `index.html` in its directory

## Manual Deployment

If automatic deployment isn't working, you can manually deploy:

1. Run `npm run build` locally
2. Upload the `out` directory contents to Cloudflare Pages
3. Or use Wrangler CLI: `npx wrangler pages deploy out`

