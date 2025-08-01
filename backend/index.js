const express = require("express");
const cors = require("cors");
const { listFilesInFolder } = require("./driveService");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Google Drive API is running");
});

app.get("/api/drive/files/:folderId", async (req, res) => {
  try {
    const { folderId } = req.params;
    const files = await listFilesInFolder(folderId);
    res.json(files);
  } catch (err) {
    console.error("Error fetching drive files:", err.message);
    res.status(500).json({ error: "Failed to fetch drive files" });
  }
});

app.listen(8080, () => console.log("Backend server running on http://localhost:8080"));
