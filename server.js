const express = require('express');
const path = require('path');
const app = express();

const DIST_FOLDER = path.join(__dirname, 'dist/moviebook/browser');
app.use(express.static(DIST_FOLDER));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🔥 Frontend corriendo en el puerto ${PORT}`);
});
