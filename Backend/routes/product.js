const express=require('express');
const router=express.Router();

const { getProduct,createNewProduct,getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts }=require("../controllers/productController")

const{isAuthenticatedUser,authorizeRole}=require('./../middlewares/auth');
const { route } = require('./auth');


router.route('/products').get(getProduct);
router.get('/product/:id',getSingleProduct);


// Add admin check router 



router.route('/admin/product/create').post(isAuthenticatedUser,authorizeRole('admin'),createNewProduct);

router.route('/admin/product/:id')
                                .put(isAuthenticatedUser,authorizeRole('admin'),updateProduct)
                                .delete(isAuthenticatedUser,authorizeRole('admin'),deleteProduct);
router.route('/admin/products').get(isAuthenticatedUser,authorizeRole('admin'),getAdminProducts); 

router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(isAuthenticatedUser,getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteReview);





module.exports=router