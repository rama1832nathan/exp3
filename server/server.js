const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;
const FILE_PATH = 'formData.json';

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const newEntry = req.body;
  newEntry.timestamp = new Date().toISOString();

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    let existingData = [];

    if (!err && data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          existingData = parsed;
        } else {
          console.warn('JSON file was not an array. Resetting to empty array.');
        }
      } catch (parseErr) {
        console.error('Error parsing existing JSON:', parseErr);
      }
    }

    existingData.push(newEntry);

    fs.writeFile(FILE_PATH, JSON.stringify(existingData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error saving data:', writeErr);
        return res.status(500).json({ message: 'Failed to save data.' });
      }

      res.status(200).json({ message: 'Data saved successfully!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
