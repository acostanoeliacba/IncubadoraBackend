
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelizeUsers } = require('./db/database.js');

const userRoutes = require('./routes/usersroutes');  // Rutas de usuarios
const asistRoutes = require('./routes/asistroutes');  // Rutas de asistencias

dotenv.config();  // Cargar variables de entorno

const app = express();

// URL frontend Angular
app.use(cors({
  origin: 'http://localhost:4200'  
}));


app.use(express.json());
app.use(cors());  // Solo si es nesesario usar CORS

// Rutas
app.use('/user', userRoutes);
app.use('/asist', asistRoutes);

// Conectar con la base de datos y arrancar el servidor
sequelizeUsers.authenticate()  // Verifica solo la conexión, no sincroniza ni modifica la base de datos
.then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
})
.catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});


