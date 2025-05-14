const express =require('express');
const router = express.Router();
const pagos = require('../controllers/pagoscontrollers')
const {isAuthenticated} = require('../middleware/autenticacion')
const Stripe = require('stripe');
//const stripe = Stripe('sk_test_...');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent',pagos.stripeIntent)
router.post('/',pagos.cargaPago)
router.get('/', isAuthenticated , pagos.getAllpagos  )
router.get('/:id_usuario',isAuthenticated, pagos.getSinglePago)


module.exports = router;
