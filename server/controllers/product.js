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

exports.list = async (req, res) => {
    try {
        const { sort, order, limit } = req.body;
        const products = await Product.find({})
            .populate("category")
            .populate("subCategory")
            .sort([[sort, order]])
            .limit(limit)
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
