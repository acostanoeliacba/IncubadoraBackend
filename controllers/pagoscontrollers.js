const Pagos = require("../models/pagos");
const { validationResult } = require('express-validator');

// recupera todos los pagos
const getAllpagos = async (req, res, next) => {
    try {
        const pagos = await Pagos.findAll();
        res.status(200).json(pagos);
    } catch (error) {
        next(error);
    }
};
// recupera un solo pago por el id
const getSinglePago = async (req, res, next) => {
    
    try {
        const pagoId = req.params.id_usuario; 
        if (!Number.isInteger(Number(pagoId))) {
            return res.status(400).json({ error: "Usa un ID válido para encontrar la informacion de pago del Usuario" });
        }
        const pago = await Pagos.findOne({ where: { id_usuario: pagoId} });

        if (!pago) {
            return res.status(400).json({ error: "Pago de Usuario no encontrado" });
        }

        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ error: "Hubo un error tratando de encontrar informacion de pago del Usuario", error });
    }
};

module.exports = 
{
    getAllpagos,
    getSinglePago
}
