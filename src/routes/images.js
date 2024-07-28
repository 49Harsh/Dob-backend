
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, folderId } = req.body;
    const newImage = new Image({
      name,
      path: req.file.path,
      user: req.user.id,
      folder: folderId,
    });
    await newImage.save();
    res.json(newImage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const images = await Image.find({
      user: req.user.id,
      name: { $regex: query, $options: 'i' },
    });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;