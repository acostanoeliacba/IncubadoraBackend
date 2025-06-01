
const db = require('../models');
const Pagos = db.pagos;
const Usuarios = db.usuarios;
const Cursos = db.cursos;

exports.obtenerPagosAdmin = async (req, res) => {
  try {
    const pagos = await Pagos.findAll({
      include: [
        { model: Usuarios, as: 'usuario', attributes: ['nombre'] },
        { model: Cursos, as: 'curso', attributes: ['nombre_curso'] }
      ],
      attributes: ['id_pago', 'monto', 'fecha_pago']
    });

    const resultado = pagos.map(pago => ({
      usuario: pago.usuario?.nombre || 'Desconocido',
      curso: pago.curso?.nombre_curso || 'Desconocido',
      monto: pago.monto,
      fecha: pago.fecha_pago
    }));

    res.status(200).json(resultado);
  } catch (err) {
    console.error('Error al obtener pagos admin:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.obtenerTotalPagos = async (req, res) => {
  try {
    const [resultado] = await db.sequelize.query('SELECT SUM(monto) AS total FROM pagos');
    res.json(resultado[0]);
  } catch (error) {
    console.error('Error al obtener total de pagos:', error);
    res.status(500).json({ mensaje: 'Error al obtener total de pagos' });
  }
};

exports.obtenerTotalesPorMes = async (req, res) => {
  try {
    const [resultado] = await db.sequelize.query(`
      SELECT DATE_FORMAT(fecha_pago, '%Y-%m') AS mes, SUM(monto) AS total
      FROM pagos
      GROUP BY mes
      ORDER BY mes DESC
    `);
    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener pagos por mes:', error);
    res.status(500).json({ mensaje: 'Error al obtener pagos por mes' });
  }
};
