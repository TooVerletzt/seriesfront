const express = require('express');
const path = require('path');
const app = express();

// Sirve los archivos estáticos desde Angular
app.use(express.static(path.join(__dirname, 'dist/moviebook')));

// Para rutas SPA como /home, /login
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/moviebook/index.html'));
});

// Levanta el servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🔥 Frontend corriendo en el puerto ${PORT}`);
});
