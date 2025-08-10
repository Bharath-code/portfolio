# Spotify API Setup Guide

This guide will help you set up the Spotify API integration for your portfolio.

## Prerequisites

1. A Spotify account (free or premium)
2. Node.js and npm installed
3. Your portfolio project cloned and running

## Step 1: Create a Spotify App

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the details:
   - **App name**: Your portfolio name (e.g., "My Portfolio")
   - **App description**: Brief description of your portfolio
   - **What are you building?**: Website
5. Click "Create"

## Step 2: Configure Your Spotify App

1. Once created, click on your app
2. Go to "Settings"
3. Note down your **Client ID** and **Client Secret**
4. Under "Redirect URIs", add:
   - For local development: `http://localhost:4321/api/spotify/auth/callback`
   - For production: `https://yourdomain.com/api/spotify/auth/callback`

## Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values:
   ```bash
   SPOTIFY_CLIENT_ID=your_actual_client_id_here
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:4321/api/spotify/auth/callback
   SPOTIFY_ACCESS_TOKEN=
   SPOTIFY_REFRESH_TOKEN=
   ```

## Step 4: Authenticate with Spotify

You need to authenticate your app to get the access and refresh tokens:

### Option 1: Use the Built-in Authentication Flow

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:4321/api/spotify/auth` in your browser

3. Follow the authentication flow and authorize your app

4. After authorization, you'll be redirected back and the tokens will be automatically saved

### Option 2: Manual Token Generation

1. Visit: `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:4321/api/spotify/auth/callback&scope=user-read-currently-playing%20user-read-recently-played%20user-top-read%20user-follow-read%20user-library-read%20user-read-playback-state%20user-modify-playback-state`

2. After authorization, you'll get a code in the URL

3. Exchange the code for tokens using a POST request to `/api/spotify/auth/callback`

## Step 5: Verify Setup

1. Restart your development server
2. Check the console for any Spotify-related errors
3. Visit your portfolio and check if the Spotify integration is working

## Troubleshooting

### Common Issues

1. **"Missing required environment variables"**
   - Ensure all variables in `.env` are properly set
   - Restart the development server after making changes
   - Check for typos in variable names

2. **"Invalid redirect URI"**
   - Ensure the redirect URI in your Spotify app settings matches exactly with `SPOTIFY_REDIRECT_URI`
   - Include the full path including `/api/spotify/auth/callback`

3. **"Invalid client credentials"**
   - Double-check your Client ID and Client Secret
   - Ensure there are no extra spaces or characters

4. **"No active device"**
   - Ensure Spotify is open and playing on at least one device
   - Check that you're logged into the same Spotify account

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `SPOTIFY_CLIENT_ID` | Your Spotify app's client ID | `abc123def456...` |
| `SPOTIFY_CLIENT_SECRET` | Your Spotify app's client secret | `xyz789uvw012...` |
| `SPOTIFY_REDIRECT_URI` | OAuth redirect URI | `http://localhost:4321/api/spotify/auth/callback` |
| `SPOTIFY_ACCESS_TOKEN` | Generated after authentication | Leave empty initially |
| `SPOTIFY_REFRESH_TOKEN` | Generated after authentication | Leave empty initially |

## Security Notes

- Never commit your `.env` file to version control
- Never share your Client Secret publicly
- Use environment variables in production instead of hardcoded values
- Consider using a secrets management service for production deployments

## Next Steps

Once you have the Spotify integration working:
1. Test all features (currently playing, top tracks, etc.)
2. Customize the UI to match your portfolio design
3. Add additional Spotify features if desired
4. Test the integration in production environment