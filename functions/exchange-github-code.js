// This is a sample serverless function for handling GitHub OAuth code exchange
// You can deploy this using Netlify Functions, Vercel Serverless Functions, or AWS Lambda

// Required environment variables:
// - GITHUB_CLIENT_ID: Your GitHub OAuth App client ID
// - GITHUB_CLIENT_SECRET: Your GitHub OAuth App client secret
// - ALLOWED_ORIGIN: The origin allowed to make requests (your site URL)

const axios = require('axios');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  try {
    // Parse request body
    const requestBody = JSON.parse(event.body);
    const code = requestBody.code;
    
    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Code is required' })
      };
    }
    
    // Exchange code for token with GitHub
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    
    // Return the access token
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(tokenResponse.data)
    };
  } catch (error) {
    console.error('Error exchanging GitHub code:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to exchange code for token',
        details: error.message
      })
    };
  }
};
