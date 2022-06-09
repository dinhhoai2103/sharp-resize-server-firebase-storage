require('dotenv').config();
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const firebase = require('./firebase');
var cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

const upload = multer();
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Error: No files found');
  }
  const fileName = `${new Date().getTime()}_${req.file.originalname}`;
  let response;
  if (req.file.mimetype === 'image/png') {
    response = await sharp(req.file.buffer)
      .png({ quality: 50, force: true })
      .toFormat(req.file.mimetype.replace('image/', ''))
      .toBuffer();
  } else {
    response = await sharp(req.file.buffer)
      .jpeg({ quality: 50, force: true })
      .toFormat(req.file.mimetype.replace('image/', ''))
      .toBuffer();
  }
  const blob = firebase.bucket.file(`images/${fileName}`);
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobWriter.on('error', (err) => {
    console.log(err);
  });
  blobWriter.on('finish', () => {
    res.status(200).send(fileName);
  });

  blobWriter.end(response);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
