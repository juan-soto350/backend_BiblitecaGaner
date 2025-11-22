//IMPORTACION DE BIBLITECAS Y CONSTANTES
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL =process.env.MONGO_URI;

app.use(express.json());
//CONEXION A BASE DE DATOS(MONGODB)
mongoose.connect(MONGODB_URL)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch(err => {
      console.log('MongoDB connection failed:', err.message);
      process.exit(1);
    }); 

//RUTAS
const  juegosRoutes = require('./routes/juegosRoutes');
app.use('/api/juegos', juegosRoutes);

const resenasRoutes = require('./routes/resenaRoutes');
app.use('/api/resenas', resenasRoutes);


app.listen(PORT,() =>{
  console.log(`Server is running on http://localhost:${PORT}`);
});