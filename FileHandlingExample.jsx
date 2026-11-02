const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
});

const upload = multer({ storage });

app.post('/upload-single', upload.single('avatar'), (req, res) => {
    res.json({ message: 'Single file uploaded!', file: req.file });
});

app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
    res.json({ message: 'Multiple files uploaded!', files: req.files });
});

app.listen(3000, () => console.log('Server running on port 3000'));
