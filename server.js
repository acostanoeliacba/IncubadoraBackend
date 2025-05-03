
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelizeUsers } = require('./db/database.js');

const userRoutes = require('./routes/usersroutes');
const cursosRoutes = require('./routes/cursosroutes');  
const empresasRoutes = require('./routes/empresasroutes'); 
const publicacionesRoutes = require('./routes/publicacionesroutes');  
const entrenamientosRoutes = require('./routes/entrenamientosroutes'); 
const inscripcionesRoutes = require('./routes/inscripcionesroutes');  

dotenv.config(); 
const app = express();

app.use(cors({
  origin: 'http://localhost:4200'  
}));

app.use(express.json());
//app.use(cors());  

app.use('/user', userRoutes);
app.use('/cursos', cursosRoutes);
app.use('/empresas', empresasRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/entrenamientos', entrenamientosRoutes);
app.use('/inscripciones', inscripcionesRoutes);


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


