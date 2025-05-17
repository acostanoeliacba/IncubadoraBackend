
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelizeUsers } = require('./db/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const multer = require('multer');

const userRoutes = require('./routes/usersroutes');
const cursosRoutes = require('./routes/cursosroutes');  
const empresasRoutes = require('./routes/empresasroutes'); 
const publicacionesRoutes = require('./routes/publicacionesroutes');  
const entrenamientosRoutes = require('./routes/entrenamientosroutes'); 
const inscripcionesRoutes = require('./routes/inscripcionesroutes');  
const asistenciasRoutes = require('./routes/asistenciasroutes');  
const pagosRoutes = require('./routes/pagosroutes');
const contenidosRoutes = require('./routes/contenidoroutes');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // La carpeta donde se guardarán las fotos
  },
  filename: (req, file, cb) => {
    const dni = req.body.dni || 'sin_dni'; // Usa 'sin_dni' como valor por defecto si no hay dni
    const ext = path.extname(file.originalname);
    const filename = `${dni}_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

//const upload = multer({ storage: storage });
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se permiten JPG y PNG.'));
    }
  }
});

dotenv.config(); 
const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));

app.use(express.json());
app.use(cors()); 

const sessionStore = new SequelizeStore({
  db: sequelizeUsers, // Instancia de Sequelize
  tableName: 'Sessions',    // Nombre de la tabla donde se guardarán las sesiones 
  checkExpirationInterval: 15 * 60 * 1000, 
  expiration: 24 * 60 * 60 * 1000, 
});
sessionStore.sync();

app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.SESSION_COOKIE_SECURE,
    maxAge: 1000 * 60 * 60
  }
}));

app.use(passport.initialize())
// iniciar passport en cada ruta llamada
app.use(passport.session())

app.use('/uploads', express.static('uploads'));

app.use('/user', userRoutes);
app.use('/cursos', cursosRoutes);
app.use('/empresas', empresasRoutes);
app.use('/publicaciones', publicacionesRoutes);
app.use('/entrenamientos', entrenamientosRoutes);
app.use('/inscripciones', inscripcionesRoutes);
app.use('/asistencias', asistenciasRoutes);
app.use('/pagos', pagosRoutes);
app.use('/contenidos', contenidosRoutes);


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

//esta ruta solo devuelve el nombre puede ser suplantada por(loginGithub)que devuelve mas datos y ademas esta definida como controlador
app.get('/user',(req ,res)=>{res.send(req.session.user !== undefined ?`Iniciado sesión como ${req.session.user.displayName}`:'Sesión Cerrada')})
//
app.get('/github/callback', passport.authenticate('github',{
     failureRedirect :'user/login',session :false}),
     (req , res)=>{
     req.session.user = req.user;
    const [apellido, ...rest] = req.user.displayName.trim().split(' ');
    const nombre = rest.join(' ');
         console.log('Nombre:', nombre);
         console.log('Apellido:', apellido);
         console.log('Email:', req.user.emails?.[0]?.value);
         console.log('Foto:', req.user.photos?.[0]?.value);
         res.redirect('http://localhost:4200/registro');
 });

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


