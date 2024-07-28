const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Folder = require('../models/Folder');

router.post('/', auth, async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const newFolder = new Folder({
      name,
      user: req.user.id,
      parent: parentId || null,
    });
    await newFolder.save();
    res.json(newFolder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user.id });
    res.json(folders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;