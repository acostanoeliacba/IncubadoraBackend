// Funcion Autenticacion = esta autenticado

const isAuthenticated = async (req, res) => {
   if (req.session && req.session.user) {
    const usuario = {
      nombre: req.session.user.displayName,//nota github devuenlve nombre completo no nombre y apellido deveria modificar tabla
      email: req.session.user.emails?.[0]?.value || 'Email no disponible',
      foto: req.session.user.photos?.[0]?.value || null
    };

    return res.status(200).json({ usuario });
  } else {
    return res.status(401).json({ message: 'No tienes acceso' });
  }
};
module.exports = {isAuthenticated}     