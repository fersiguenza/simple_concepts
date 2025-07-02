# SimpleConcepts Serverless Functions

This directory contains serverless functions that support the SimpleConcepts website, particularly the Easy Contribution feature.

## Setting Up

These functions can be deployed using:
- [Netlify Functions](https://www.netlify.com/products/functions/)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [AWS Lambda](https://aws.amazon.com/lambda/)

### Required Environment Variables

For the GitHub OAuth integration to work, you'll need to set the following environment variables:

- `GITHUB_CLIENT_ID`: Your GitHub OAuth App client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App client secret
- `ALLOWED_ORIGIN`: The origin allowed to make requests (your site URL)

### Creating a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "New OAuth App"
3. Fill in the application details:
   - Application name: SimpleConcepts Contributor
   - Homepage URL: Your website URL
   - Authorization callback URL: Your website URL + `/easy-contribute/`
4. Register the application
5. You'll receive a Client ID and can generate a Client Secret

### Deployment with Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command to your Jekyll build command
3. Set the publish directory to `_site`
4. Add the environment variables in the Netlify dashboard
5. Push your changes to GitHub

Netlify will automatically detect the functions in this directory and deploy them.

### Local Development

For local development, you can use the Netlify CLI:

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify dev` in your project directory

This will simulate the Netlify environment locally.

## Functions

### `exchange-github-code.js`

This function handles the GitHub OAuth code exchange. It takes a GitHub authorization code and exchanges it for an access token. This is necessary because the GitHub OAuth flow requires a server component due to CORS restrictions.

#### Endpoint

```
POST /.netlify/functions/exchange-github-code
```

#### Request Body

```json
{
  "code": "github_authorization_code"
}
```

#### Response

```json
{
  "access_token": "github_access_token",
  "token_type": "bearer",
  "scope": "public_repo"
}
```
