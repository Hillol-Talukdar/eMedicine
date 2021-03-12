const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            text: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 32,
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        subCategory: [
            {
                type: ObjectId,
                ref: "SubCategory",
            },
        ],
        quantity: Number,
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        shipping: {
            type: String,
            enum: ["Yes", "No"],
        },
        // color: {
        //     type: String,
        //     enum: ["White", "Yellow", "Red", "Green", "Blue"],
        // },
        brand: {
            type: String,
            enum: [
                "ACI Limited",
                "ACME Laboratories Ltd.",
                "Al-Madina Pharmaceuticals Ltd.",
                "Beximco Pharmaceuticals Ltd.",
                "Bengal drugs Ltd.",
                "BioRx",
                "Globe Pharmaceuticals Ltd.",
                "Ibn Sina Pharmaceuticals Ltd.",
            ],
        },
        // will needed later
        // rating: [
        //     {
        //         star: Number,
        //         postedBy: { type: ObjectId, ref: "User" },
        //     },
        // ],
    },

    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
