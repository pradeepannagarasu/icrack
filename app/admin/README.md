# Admin Panel Documentation

## Overview

The iCrack Admin Panel provides a user-friendly interface for managing product prices and performing administrative tasks.

## Access

- **URL**: `/admin`
- **Default Password**: `admin123`
- **Production**: Set `NEXT_PUBLIC_ADMIN_PASSWORD` environment variable

## Features

### 1. Price Management
- View all repair types and device pricing
- Edit prices directly in the interface
- Support for complex pricing structures:
  - Simple pricing (screen repairs)
  - Variant pricing (battery: original/regular)
  - Nested pricing (camera: lens/replacement)
- Search and filter devices
- Download updated pricing.json

### 2. Dashboard Statistics
- Total repair types
- Total devices
- Pricing entries count
- Modification status

### 3. Security
- Password-protected access
- Session-based authentication (24-hour expiry)
- Secure logout functionality

## Usage

### Editing Prices

1. **Login** to the admin panel at `/admin`
2. **Search** for devices or filter by repair type
3. **Edit** prices directly in the input fields
4. **Download** the updated `pricing.json` file
5. **Replace** the file in `data/pricing.json`
6. **Commit** and push changes to update the website

### Price Structure

The pricing system supports multiple structures:

```json
{
  "repairs": {
    "screen": {
      "devices": {
        "iphone-15": {
          "price": 149,
          "save": 120,
          "warranty": "12 months",
          "time": "Up to 60 minutes"
        }
      }
    },
    "battery": {
      "devices": {
        "iphone-15": {
          "original": {
            "price": 65,
            "warranty": "24 months"
          },
          "regular": {
            "price": 45,
            "warranty": "24 months"
          }
        }
      }
    }
  }
}
```

## Production Setup

1. Set environment variable:
   ```bash
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
   ```

2. Update the default password in `app/admin/page.tsx` if needed

3. Consider adding additional security:
   - IP whitelisting
   - Two-factor authentication
   - Rate limiting

## Notes

- Changes are made client-side only
- You must download and manually update the pricing.json file
- Session expires after 24 hours
- All changes are tracked with "Unsaved changes" indicator

