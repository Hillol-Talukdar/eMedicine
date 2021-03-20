const express = require("express");

const router = express.Router();

//middlewares
const { authCheck } = require("../middlewares/auth");

//controller
const { userCart, getUserCart, emptyCart } = require("../controllers/user");

//save cart
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.put("/user/cart", authCheck, emptyCart);

// router.get("/user", (req, res) => {
//     res.json({
//         data: "This is user API",
//     });
// });

module.exports = router;
