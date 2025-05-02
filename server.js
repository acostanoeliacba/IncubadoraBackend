
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelizeUsers } = require('./db/database.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const userRoutes = require('./routes/usersroutes');  // Rutas de usuarios


dotenv.config(); 
const app = express();


app.use(cors({
  origin: 'http://localhost:4200'  
}));


app.use(express.json());
// app.use(cors()); 
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized :true,

}))
app.use(passport.initialize())
// iniciar passport en cada ruta llamada
app.use(passport.session())


app.use('/user', userRoutes);

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


