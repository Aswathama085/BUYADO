const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//Create Product ---- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});


//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});


//Get Product Details
exports.getProductDeatils = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    sucess: true,
    product,
  });
});


//Update Product -- - --ADMIN
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 201));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});


//Delete Product ---ADMIN
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 500));
  }

  await product.remove();

  res.status(200).json({
    sucess: true,
    message: "Product Deleted Successfully",
  });
});


//Create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }

  let avg=0;
  product.reviews.forEach(rev=>{
    avg+=rev.rating
  })

  product.ratings = avg/product.reviews.length; 

  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success: true,
  })
});


//Get all Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
  
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews:product.reviews
  });
});

//Delete Reviews
exports.deleteReviews= catchAsyncErrors(async (req,res,next)=>{
  
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString());

  let avg=0;
  reviews.forEach(rev=>{
    avg+=rev.rating
  })

  const rating = avg/reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    rating,
    numOfReviews,
  },{
    new: true,
    runValidators:true,
    useFindAndModify: false,
  })


  res.status(200).json({
    success: true,
  });

});
