# Custom Domain Setup for Cloudflare Pages

## Issue: 404 Error on Custom Domain

If you're seeing a 404 error on `icrackphonesandmacs.co.uk`, follow these steps:

## Step 1: Connect Custom Domain in Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Navigate to: `https://dash.cloudflare.com`
   - Select **Pages** from the sidebar
   - Click on your **iCrack** project

2. **Add Custom Domain**
   - Click on **Custom domains** tab
   - Click **Set up a custom domain**
   - Enter: `icrackphonesandmacs.co.uk`
   - Click **Continue**

3. **Add www Subdomain (Optional but Recommended)**
   - Also add: `www.icrackphonesandmacs.co.uk`
   - This allows both `icrackphonesandmacs.co.uk` and `www.icrackphonesandmacs.co.uk` to work

## Step 2: Verify DNS Settings

### If Domain is Managed by Cloudflare:

1. **Automatic DNS Configuration**
   - Cloudflare Pages will automatically create the necessary DNS records
   - Check **DNS** → **Records** in your domain's Cloudflare dashboard
   - You should see:
     - Type: `CNAME`
     - Name: `@` (or root domain)
     - Target: `your-project.pages.dev` (or similar)
     - Proxy status: Proxied (orange cloud)

2. **For www Subdomain**
   - Type: `CNAME`
   - Name: `www`
   - Target: `your-project.pages.dev`
   - Proxy status: Proxied

### If Domain is NOT Managed by Cloudflare:

1. **Add CNAME Record**
   - Go to your domain registrar's DNS settings
   - Add a CNAME record:
     - **Name/Host**: `@` (or leave blank for root domain)
     - **Target/Value**: `your-project.pages.dev` (get this from Cloudflare Pages)
     - **TTL**: 3600 (or default)

2. **For www Subdomain**
   - Add another CNAME:
     - **Name/Host**: `www`
     - **Target/Value**: `your-project.pages.dev`
     - **TTL**: 3600

## Step 3: SSL/TLS Configuration

1. **Enable SSL/TLS**
   - In Cloudflare Dashboard → **SSL/TLS**
   - Set encryption mode to: **Full** or **Full (strict)**
   - Cloudflare Pages will automatically provision SSL certificates

2. **Wait for SSL Certificate**
   - SSL certificates are automatically provisioned
   - This can take a few minutes to a few hours
   - Check the **Custom domains** tab in Pages to see certificate status

## Step 4: Verify Configuration

1. **Check Domain Status**
   - In Cloudflare Pages → **Custom domains**
   - Status should show: **Active** (green checkmark)
   - SSL certificate should show: **Active**

2. **Test the Domain**
   - Wait 5-10 minutes after adding the domain
   - Visit: `https://icrackphonesandmacs.co.uk`
   - Also test: `https://www.icrackphonesandmacs.co.uk`

## Step 5: Troubleshooting

### If Domain Shows "Pending" Status:

- **Wait**: DNS propagation can take up to 48 hours (usually much faster)
- **Check DNS**: Verify DNS records are correct
- **Clear Cache**: Try accessing in incognito mode

### If SSL Certificate is Pending:

- **Wait**: SSL provisioning can take 15 minutes to 24 hours
- **Check DNS**: Ensure DNS is properly configured
- **Verify Domain Ownership**: Make sure you own the domain

### If Still Getting 404:

1. **Check Build Output Directory**
   - Ensure it's set to: `out`
   - Verify a recent deployment succeeded

2. **Check Deployment Status**
   - Go to **Deployments** tab
   - Ensure latest deployment shows **Success**

3. **Verify Domain Points to Correct Project**
   - In **Custom domains**, verify the domain is connected to the right project

4. **Check for Redirects**
   - Ensure no conflicting redirects in Cloudflare
   - Check **Rules** → **Redirect Rules**

## Step 6: Force HTTPS Redirect (Recommended)

1. **Create Redirect Rule**
   - Go to **Rules** → **Redirect Rules**
   - Create a rule:
     - **If**: `http://icrackphonesandmacs.co.uk/*`
     - **Then**: Redirect to `https://icrackphonesandmacs.co.uk/$1` (301)

2. **Redirect www to non-www (or vice versa)**
   - Choose one canonical domain (e.g., non-www)
   - Redirect the other to it

## Quick Checklist

- [ ] Custom domain added in Cloudflare Pages
- [ ] DNS records configured correctly
- [ ] SSL certificate active
- [ ] Domain status shows "Active"
- [ ] Latest deployment successful
- [ ] Build output directory set to `out`
- [ ] Tested both `http://` and `https://`
- [ ] Tested both `www` and non-`www` versions

## Need Help?

If you're still experiencing issues:

1. **Check Cloudflare Pages Logs**
   - Look for any error messages in the deployment logs

2. **Verify DNS Propagation**
   - Use tools like `dig` or online DNS checkers
   - Command: `dig icrackphonesandmacs.co.uk`

3. **Contact Cloudflare Support**
   - If domain is managed by Cloudflare, they can help troubleshoot

4. **Check Domain Registrar**
   - If domain is not with Cloudflare, verify DNS settings at your registrar

