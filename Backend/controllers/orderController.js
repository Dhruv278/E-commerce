const Order=require('../models/order');
const Product=require('../models/product')


const ErrorHandler=require('../utils/errorHandler');
const catchAsync=require('../middlewares/catchAsync')



exports.newOrder=catchAsync(async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body;


    const order=await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id

    })

    res.status(200).json({
        success:true,
        order
    })
})


exports.getSingleOrder=catchAsync(async(req,res,next)=>{
        const order=await Order.findById(req.params.id).populate('user','name email')

        if(!order){
            return next(new ErrorHandler('No Order found ....',404))
        }

        res.status(200).json({
            success:true,
            order
        })
})


exports.myOrders=catchAsync(async(req,res,next)=>{
    const orders=await Order.find({ user:req.user.id}).sort({createdAt:-1})
    console.log(orders)
    res.status(200).json({
        success:true,
        orders 
    })
})


exports.allOrders=catchAsync(async(req,res,next)=>{
        const orders=await Order.find();

        let totalAmount=0;
        orders.forEach(order=>{
            totalAmount +=order.totalPrice
        })

        res.status(200).json({
            success:true,
            totalAmount,
            orders
        })
})

exports.updateOrder=catchAsync(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(order.orderStatus==='Delivered'){
        return next(new ErrorHandler('You have already deliverd this order',400))

    }

    order.orderItems.forEach(async item=>{
        await UpdateStock(item.product,item.quantity)
    })


    order.orderStatus=req.body.status,
    order.deliveredAt=Date.now()

    await order.save() ;

    res.status(200).json({
        success:true,
        order
    })
})


async function UpdateStock(id,quantity){

    const product=await Product.findById(id);
    product.stock=product.stock-quantity;

    await product.save({validateBeforeSave:false})
}




exports.deleteOrder=catchAsync(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No Order found ....',404))
    }
    await order.remove()
    res.status(200).json({
        success:true,
        order
    })
})
