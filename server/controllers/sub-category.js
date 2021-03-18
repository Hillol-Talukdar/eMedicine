const SubCategory = require("../models/sub-category");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const category = await new SubCategory({
            name,
            parent,
            slug: slugify(name),
        }).save();
        res.json(category);
    } catch (err) {
        // console.log(err);
        res.status(400).send("Failed To Create Sub-category!");
    }
};

exports.list = async (req, res) => {
    res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
    let subCategory = await SubCategory.findOne({
        slug: req.params.slug,
    }).exec();
    // res.json(subCategory);

    const products = await Product.find({ subCategory: subCategory })
        .populate("category")
        .exec();

    res.json({
        subCategory,
        products,
    });
};

exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await SubCategory.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            { name, parent, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        // console.log(err);
        res.status(400).send("Failed To Update Sub-Category!");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await SubCategory.findOneAndDelete({
            slug: req.params.slug,
        });
        res.json(deleted);
    } catch (err) {
        // console.log(err);
        res.status(400).send("Failed To Delete Sub-Category!");
    }
};
