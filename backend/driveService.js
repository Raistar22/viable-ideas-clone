const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const credentials = {
  client_id: "456904440890-rpgumemjhgdi41lnaupvihi9g021esbf.apps.googleusercontent.com",
  client_secret: "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",
  redirect_uris: ["http://localhost:8080/oauth2callback"],
};

const TOKEN_PATH = path.resolve(__dirname, "token.json");

async function getDriveClient() {
  const { client_id, client_secret, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
  } catch (error) {
    console.error("❌ Token error:", error.message);
    throw new Error("Token file not found or invalid. Run `node getToken.js` again.");
  }

  return google.drive({ version: "v3", auth: oAuth2Client });
}

async function listFilesInFolder(folderId) {
  try {
    const drive = await getDriveClient();
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink)",
    });

    console.log(`📁 Files found in folder ${folderId}:`, res.data.files);
    return res.data.files;
  } catch (error) {
    console.error("❌ Error fetching files from Drive:", error.message);
    throw new Error("Failed to fetch files from Google Drive.");
  }
}

module.exports = { listFilesInFolder };
