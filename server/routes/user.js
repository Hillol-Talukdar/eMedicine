const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth");

//controller
const {
    userCart,
    getUserCart,
    emptyCart,
    saveAddress,
    applyCouponToUserCart,
} = require("../controllers/user");

//save cart
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// router.get("/user", (req, res) => {
//     res.json({
//         data: "This is user API",
//     });
// });

module.exports = router;
