
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelizeUsers } = require('./db/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { createServer } = require('node:http');
const { Server } = require('socket.io');



const userRoutes = require('./routes/usersroutes');
const cursosRoutes = require('./routes/cursosroutes');  
const empresasRoutes = require('./routes/empresasroutes'); 
const publicacionesRoutes = require('./routes/publicacionesroutes');  
const entrenamientosRoutes = require('./routes/entrenamientosroutes'); 
const inscripcionesRoutes = require('./routes/inscripcionesroutes');  
const asistenciasRoutes = require('./routes/asistenciasroutes');  

dotenv.config(); 
const app = express();


app.use(cors({
  origin: 'http://localhost:4200'  
}));

app.use(express.json());
app.use(cors()); 

const sessionStore = new SequelizeStore({
  db: sequelizeUsers, // Tu instancia de Sequelize
  tableName: 'Sessions',    // Nombre de la tabla donde se guardarán las sesiones 
  checkExpirationInterval: 15 * 60 * 1000, 
  expiration: 24 * 60 * 60 * 1000, 
});
sessionStore.sync();

app.use(session({
    store: sessionStore,
    secret:'secret',
    resave:false,
    saveUninitialized :false,
     cookie: {
      secure: process.env.NODE_ENV === 'production',
     }

}))
app.use(passport.initialize())
// iniciar passport en cada ruta llamada
app.use(passport.session())

app.use('/user', userRoutes);
app.use('/cursos', cursosRoutes);
app.use('/empresas', empresasRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/entrenamientos', entrenamientosRoutes);
app.use('/inscripciones', inscripcionesRoutes);
app.use('/asistencias', asistenciasRoutes);


const server = createServer(app);
const io = new Server(server);

// chat
// esto emitirá el evento a todos los sockets conectados
 io.emit('hello', 'world'); 

// Si desea enviar un mensaje a todos excepto a un socket emisor determinado
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

// envia el mensaje a todos, incluido el remitente.
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
      console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// para la autenticacion
passport.use(new GitHubStrategy({
    clientID : process.env.GITHUB_CLIENT_ID,
    clientSecret :process.env.GITHUB_CLIENT_SECRET,
    callbackURL : process.env.CALLBACK_URL
 },
  function(accessToken , refreshToken ,profile ,done){
    return done(null,profile);

  }));


  passport.serializeUser((user , done)=>{
    done(null ,user);})
  passport.deserializeUser((user , done)=>{
    done(null ,user);})  

app.get('/user',(req ,res)=>{res.send(req.session.user !== undefined ?`Iniciado sesión como ${req.session.user.displayName}`:'Sesión Cerrada')})

app.get('/github/callback', passport.authenticate('github',{
    failureRedirect :'/users/login',session :false}),
    (req , res)=>{
    req.session.user = req.user;
    res.redirect('/user');

});

sequelizeUsers.authenticate()  // Verifica solo la conexión, no sincroniza ni modifica la base de datos
.then(() => {
    console.log('Conexión exitosa a la base de datos');
    server.listen(3000, () => {
        console.log('Servidor corriendo en el puerto 3000');
    });
})
.catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});


