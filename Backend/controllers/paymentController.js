const catchAsync=require('../middlewares/catchAsync')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process Stripe Payments

exports.processPayments=catchAsync(async(req,res,next)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'inr',
        metadata:{
            integration_check:'accept_payment'
        }

    })
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })
})


exports.sendStripeKey=catchAsync(async (req,res,next)=>{
    
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_PUBLIC_KEY
    })
})


exports.checkout=catchAsync(async(req,res,next)=>{
    const cartItems=req.body.cartItems;
    const session=await stripe.checkout.sessions.create({

    })
})