const express = require('express');
const router = express.Router();
const drive = require('../driveService');

// Map frontend entity to folder ID
const entityFolderMap = {
  "riffle-inc": "1AMxeRBk55wfAGo5Mq4n7x4km3TOYRaIh",
  "riffle-studio": "1KYGt25d4mlESr_t3VeesjwMmMeMIl_SL",

  "deo-studios": "1b56ukUDvG1GDM5xzeuXA2BdUThzvBffH",
  "ember-labs": "1Sh0u9zUnwI1dZKdFmb7OOxW48QMRWGYP",
};

// Get all files inside an entity’s root folder
router.get('/:entity/files', async (req, res) => {
  const { entity } = req.params;
  const folderId = entityFolderMap[entity];

  if (!folderId) return res.status(400).json({ error: 'Invalid entity' });

  try {
    const result = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, parents)',
    });

    res.json(result.data.files);
  } catch (error) {
    console.error('Drive API error:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

module.exports = router;
