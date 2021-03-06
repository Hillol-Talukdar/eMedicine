const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        // console.log(err);
        // res.status(400).send("Failed To Create Product!");
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subCategory")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(products);
};

exports.remove = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndRemove({
            slug: req.params.slug,
        }).exec();
        res.json(deletedProduct);
    } catch (err) {
        // console.log(err);
        return res.status(400).send("Failed to delete Product.");
    }
};

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subCategory")
        .exec();
    res.json(product);
};

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();

        res.json(updated);
    } catch (err) {
        // console.log(err);
        res.status(400).json({
            err: err.message,
        });
    }
};

//Need this if we want to use without pagination
// exports.list = async (req, res) => {
//     try {
//         const { sort, order, limit } = req.body;
//         const products = await Product.find({})
//             .populate("category")
//             .populate("subCategory")
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec();
//         res.json(products);
//     } catch (err) {
//         console.log(err);
//     }
// };

exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body;
        const currentPage = page || 1;
        const perPage = 4;
        const products = await Product.find({})
            .skip((currentPage - 1) * perPage)
            .populate("category")
            .populate("subCategory")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();
        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    //check if logged in uuser habe already added rating to this product
    let existingRatingObject = product.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
    );

    //if user havenot left rating yet,
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user._id } },
            },
            { new: true }
        ).exec();

        // console.log("RatingAdded", ratingAdded);
        res.json(ratingAdded);
    } else {
        //if use already left rating
        const ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject },
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();

        console.log("RatingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }
};

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();

    let related = await Product.find({
        _id: { $ne: product._id },
        category: product.category,
    })
        .limit(3)
        .populate("category")
        .populate("subCategory")
        .populate("postedBy")
        .exec();

    res.json(related);
};

//search filters

const handleCategory = async (req, res, category) => {
    try {
        let products = await Product.find({ category })
            .populate("category", "_id name")
            .populate("subCategory", "_id name")
            .populate("postedBy", "_id name")
            .exec();
        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
        .populate("category", "_id name")
        .populate("subCategory", "_id name")
        .populate("postedBy", "_id name")
        .exec();

    res.json(products);
};

const handlePrice = async (req, res, price) => {
    try {
        let products = await Product.find({
            price: {
                $gte: price[0],
                $lte: price[1],
            },
        })
            .populate("category", "_id name")
            .populate("subCategory", "_id name")
            .populate("postedBy", "_id name")
            .exec();

        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

const handleStar = (req, res, stars) => {
    Product.aggregate([
        {
            $project: {
                document: "$$ROOT",
                floorAverage: {
                    $floor: { $avg: "$ratings.star" },
                },
            },
        },
        { $match: { floorAverage: stars } },
    ])
        .limit(12)
        .exec((err, aggregates) => {
            if (err) {
                console.log("AGGREGATE ERROR", err);
            }
            Product.find({ _id: aggregates })
                .populate("category", "_id name")
                .populate("subCategory", "_id name")
                .populate("postedBy", "_id name")
                .exec((err, products) => {
                    if (err) {
                        console.log("PRODUCT AGGREGATE ERROR", err);
                    }
                    res.json(products);
                });
        });
};

const handleSubCategory = async (req, res, subCategory) => {
    const products = await Product.find({ subCategory })
        .populate("category", "_id name")
        .populate("subCategory", "_id name")
        .populate("postedBy", "_id name")
        .exec();

    res.json(products);
};

const handleShipping = async (req, res, shipping) => {
    const products = await Product.find({ shipping })
        .populate("category", "_id name")
        .populate("subCategory", "_id name")
        .populate("postedBy", "_id name")
        .exec();

    res.json(products);
};

const handleBrand = async (req, res, brand) => {
    const products = await Product.find({ brand })
        .populate("category", "_id name")
        .populate("subCategory", "_id name")
        .populate("postedBy", "_id name")
        .exec();

    res.json(products);
};

exports.searchFilters = async (req, res) => {
    const {
        query,
        price,
        category,
        stars,
        subCategory,
        shipping,
        brand,
    } = req.body;

    if (query) {
        // console.log('query', query);
        await handleQuery(req, res, query);
    }
    if (price !== undefined) {
        await handlePrice(req, res, price);
    }
    if (category) {
        // console.log('query', query);
        await handleCategory(req, res, category);
    }
    if (stars) {
        // console.log("stars ", stars);
        await handleStar(req, res, stars);
    }
    if (subCategory) {
        // console.log("subCategory ", subCategory);
        await handleSubCategory(req, res, subCategory);
    }
    if (shipping) {
        // console.log("shipping ", shipping);
        await handleShipping(req, res, shipping);
    }
    if (brand) {
        // console.log("shipping ", brand);
        await handleBrand(req, res, brand);
    }
};
