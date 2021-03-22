const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    // later apply coupon

    // later calculate price
    const user = await User.findOne({ email: req.user.email }).exec();

    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
        orderdBy: user._id,
    }).exec();

    // console.log("CART TOTAL", cartTotal, "AFTER DISCOUNT", totalAfterDiscount);

    let finalAmount = 0;

    if (couponApplied && totalAfterDiscount) {
        finalAmount = totalAfterDiscount * 100;
    } else {
        finalAmount = cartTotal * 100;
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: cartTotal * 100,
        currency: "usd",
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
};
