const express=require('express');
const router=express.Router();

const {isAuthenticatedUser} =require('./../middlewares/auth');

const {processPayments,sendStripeKey} =require('../controllers/paymentController')


router.route('/payment/process').post(isAuthenticatedUser,processPayments);
router.route('/payment/key').get(isAuthenticatedUser,sendStripeKey);

module.exports=router;