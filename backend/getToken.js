// getToken.js (ES module version)
import fs from 'fs';
import http from 'http';
import { URL } from 'url';
import open from 'open';
import { google } from 'googleapis';

const CLIENT_ID = '456904440890-rpgumemjhgdi41lnaupvihi9g021esbf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:8080/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  console.log('Authorize this app by visiting this URL:\n', authUrl);
  open(authUrl);

  const server = http.createServer(async (req, res) => {
    if (req.url.includes('/oauth2callback')) {
      const qs = new URL(req.url, 'http://localhost:8080').searchParams;
      const code = qs.get('code');

      res.end('Authentication successful! You can close this tab.');
      server.close();

      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);

      fs.writeFileSync('token.json', JSON.stringify(tokens, null, 2));
      console.log('✅ Token stored to token.json');
      console.log('🪪 Your Refresh Token:', tokens.refresh_token);
    }
  }).listen(8080, () => {
    console.log('🚀 Waiting for authentication callback at http://localhost:8080/oauth2callback');
  });
}

getAccessToken();
