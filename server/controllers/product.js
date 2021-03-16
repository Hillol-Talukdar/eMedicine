const Product = require("../models/product");
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
    const { star } = res.body;

    //check if logged in uuser habe already added rating to this product
    let existingRatingObject = product.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
    );

    //if user havenot left rating yet,
    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user_id } },
            },
            { new: true }
        ).exec();

        // console.log("RatingAdded", ratingAdded);
        res.json(ratingAdded);
    } else {
        //if use already left rating
        const ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemeMatch: existingRatingObject },
            },
            { $set: { "ratings.&.star": star } },
            { new: true }
        ).exec();

        // console.log("RatingUpdated", ratingUpdated);
        res.json(ratingUpdated);
    }
};
