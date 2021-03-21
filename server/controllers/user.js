const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const { response } = require("express");

exports.userCart = async (req, res) => {
    const { cart } = req.body;
    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    // check if cart with logged in user id already exists
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;

        //get price for creating Total
        let productFromDB = await Product.findById(cart[i]._id)
            .select("price")
            .exec();

        object.price = productFromDB.price;
        products.push(object);
    }

    // console.log("products", products);

    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    // console.log("cartTotal", cartTotal);

    let newCart = await new Cart({
        products,
        cartTotal,
        orderdBy: user._id,
    }).save();

    // console.log("new Cart", newCart);
    res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();

    let cart = await Cart.findOne({ orderdBy: user._id })
        .populate("products.product", "_id title price totalAfterDiscount")
        .exec();

    const { products, cartTotal, totalAfterDiscount } = cart;

    res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();

    const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();

    res.json(cart);
};

exports.saveAddress = async (req, res) => {
    const address = await User.findOneAndUpdate(
        {
            email: req.user.email,
        },
        { address: req.body.address }
    ).exec();

    res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
    const { coupon } = req.body;
    // console.log("COUPON", coupon);

    const validCoupon = await (await Coupon.findOne({ name: coupon })).exec();

    if (validCoupon === null) {
        return res.json({
            err: "Invalid Coupon",
        });
    }
    // console.log("VALID COUPON", validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
        .populate("products.product", "_id title price")
        .exec();

    // console.log("CartTotal", cartTotal, "Discount%",validCoupon.discount )

    //total after discount
    let totalAfterDiscount = (
        cartTotal -
        (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);

    Cart.findOneAndUpdate(
        { orderdBy: user._id },
        { totalAfterDiscount },
        { new: true }
    );

    res.json(totalAfterDiscount);
};
 