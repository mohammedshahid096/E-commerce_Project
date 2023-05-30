import Product_Schema from "../Mongo_Models/Product_Schema.js";
import cloudinary from "cloudinary";

//TODO : request for getting all the products
//and for parameters search also
//filter search pagination limit
export const getAllProducts = async (req, res) => {
  try {
    let queryparams = req.query;
    let querycondition = {};
    const search = queryparams.keyword || "";
    const page_limit = 10;
    const category = queryparams.category || "";
    const ratings = parseInt(queryparams.ratings) || 0;
    const current_page = parseInt(queryparams.page) || 1;
    //condition for keyword what we search
    if (queryparams.keyword) {
      querycondition.name = { $regex: search, $options: "i" };
    }
    //condition for category param if present
    if (queryparams.category) {
      querycondition.category = category;
    }
    if (queryparams.ratings) {
      querycondition.ratings = { $gte: ratings };
    }
    //condition for price filter
    if (queryparams.price) {
      let str = JSON.stringify(queryparams.price);
      //we convert json to string and replace gt -> $gt
      str = str.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      // again converted string to json format
      str = JSON.parse(str);
      querycondition.price = str;
    }

    const totalProducts = await Product_Schema.countDocuments();
    let products;
    let FilterCount = 0;
    if (queryparams.page) {
      const skip_page = (current_page - 1) * page_limit;
      FilterCount = await Product_Schema.count(querycondition);
      products = await Product_Schema.find(querycondition)
        .limit(page_limit)
        .skip(skip_page);
    } else {
      products = await Product_Schema.find(querycondition);
      FilterCount = totalProducts;
    }

    return res.status(200).json({
      success: true,
      products,
      totalProducts,
      pagePerCount: page_limit,
      currentProductCount: products.length,
      FilterCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// TODO : for featuring products
export const FeatureProducts = async (req, res) => {
  try {
    const Allproducts = await Product_Schema.find();

    function myRandomInts(quantity, max) {
      const arr = [];
      while (arr.length < quantity) {
        var candidateInt = Math.floor(Math.random() * max) + 1;
        if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt);
      }
      return arr;
    }

    const radomValues = myRandomInts(7, Allproducts.length - 1);
    let products = [];
    radomValues.forEach((item) => {
      products.push(Allproducts[item]);
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ! ======================================
// !              Admin
// ! ======================================
// TODO : Request for  posting(adding) the new porduct
export const createProduct = async (req, res) => {
  try {
    const Productimages = req.files;
    const imagesLink = [];

    for (let i = 0; i < Productimages.length; i++) {
      const myCloud = await cloudinary.v2.uploader.upload(
        Productimages[i].path,
        {
          folder: "E-Commerce/Products",
        }
      );

      imagesLink.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
    }
    req.body.image = imagesLink;
    const product = new Product_Schema(req.body);
    await product.save();
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TODO :Request for put(updating) the existed product
export const updateProduct = async (req, res) => {
  const u_data = req.body;
  try {
    let exist = await Product_Schema.findById(req.params.id);
    if (!exist) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = await Product_Schema.findByIdAndUpdate(
      req.params.id,
      u_data,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TODO : Request for delete  the product
export const deleteProduct = async (req, res) => {
  try {
    const exist = await Product_Schema.findById(req.params.id);

    if (!exist) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }

    // console.log(exist.image);
    for (let i = 0; i < exist.image.length; i++) {
      await cloudinary.v2.uploader.destroy(exist.image[i].public_id);
    }
    await exist.remove();
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO request for single product details
export const getSingleProduct = async (req, res) => {
  try {
    const exist = await Product_Schema.findById(req.params.id);

    if (!exist) {
      return res.status(500).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: exist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//TODO : For reviews update
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating,
      comment,
      productId,
    };
    const productRating = await Product_Schema.findById(productId);
    const isrevied = productRating.reviews.find((item) => {
      return item.user === req.user._id.valueOf();
    });
    if (isrevied) {
      productRating.reviews.forEach((item) => {
        if ((item) => item.user === req.user._id.valueOf()) {
          (item.rating = rating), (item.comment = comment);
        }
      });
    } else {
      productRating.reviews.push(review);
      productRating.numofReviews = productRating.reviews.length;
    }

    let sum = 0;

    productRating.reviews.forEach((item) => {
      sum += item.rating;
    });
    productRating.ratings = sum / productRating.reviews.length;

    await productRating.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : Get all reviews of a single product
export const getProductReviews = async (req, res) => {
  try {
    const product = await Product_Schema.findById(req.query.productid);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
      productname: product.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : Delete the reviews only by admin
export const DeleteProductReview = async (req, res) => {
  try {
    const product = await Product_Schema.findById(req.query.productid);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    const reviews = product.reviews.filter((item) => {
      return item._id.toString() !== req.query.id.toString();
    });

    let sum = 0;

    reviews.forEach((item) => {
      sum += item.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = sum / reviews.length;
    }

    const numofReviews = reviews.length;
    await Product_Schema.findByIdAndUpdate(
      req.query.productid,
      {
        reviews,
        ratings,
        numofReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO : Request for all product details
export const GetAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product_Schema.find();

    res.status(200).json({
      success: true,
      products,
      TotalProducts: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
