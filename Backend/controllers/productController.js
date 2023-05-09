const Product = require("../models/product");
const ErrorHandler = require('../utils/errorHandler')
const catchAsync = require('../middlewares/catchAsync')
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary')


exports.createNewProduct = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imageLinks = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        })
        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imageLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})


exports.getProduct = catchAsync(async (req, res, next) => {
    console.log('calling')
    const resPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)



    // console.log(apiFeatures.query)
    // console.log("--------------------------")
    let products = await apiFeatures.query;
    let filterProductCount = products.length;

    // apiFeatures.pagination(resPerPage)
    // products=await apiFeatures.query;
    res.status(200).json({
        success: true,
        productCount,
        filterProductCount,
        resPerPage,
        products
    })
})

exports.getSingleProduct = catchAsync(async (req, res, next) => {


    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));

    }
    res.status(200).json({
        success: true,
        product
    })


})

exports.updateProduct = catchAsync(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return new ErrorHandler('Product not found', 404)

    }
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imageLinks = []
    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            })
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
    }
    req.body.images = imageLinks
    req.body.user = req.user.id;
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return new ErrorHandler('Product not found', 404)

    }
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    await product.remove();
    res.status(200).json({
        success: true,
    })
})


exports.createProductReview = catchAsync(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);


    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )
    // console.log(isReviewed)
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "review Added",
        product
    })
})


exports.getProductReviews = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


exports.deleteReview = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.query.id);


    const numofReviews = reviews.length;
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;



    await Product.findByIdAndUpdate(req.query.id, {
        reviews,
        ratings,
        numofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,

    })
})


exports.getAdminProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})