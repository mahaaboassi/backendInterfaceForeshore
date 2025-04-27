const path = require('path');
const fs = require('fs');

export default function handler(req, res) {
  const { filePath } = req.query;

  // Construct the full path to the file
  const fullPath = path.join(process.cwd(), 'uploads', filePath);

  // Check if the file exists
  if (fs.existsSync(fullPath)) {
    res.setHeader('Content-Type', 'image/avif'); // Set the correct content type
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
}