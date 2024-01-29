// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const PDFParser = require('pdf-parse');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post('/getPdf', async (req, res) => {
  const input = req.body.input;
  const pdfData = await readPdfData(input);
  res.contentType('application/pdf');
  res.send(pdfData);
});

async function readPdfData(pdfFileName) {
  try {
    const dataBuffer = fs.readFileSync(`./pdfs/${pdfFileName}`);
    return dataBuffer;
  } catch (error) {
    console.error('Error reading PDF data:', error);
    return null;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
