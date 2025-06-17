// server.js
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/moviebook/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/moviebook/browser/index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🔥 Frontend corriendo en el puerto ${PORT}`);
});
