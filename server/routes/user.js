const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const {
    userCart
} = require("../controllers/user");

//save cart
router.post("/cart", authCheck, userCart);

// router.get("/user", (req, res) => {
//     res.json({
//         data: "This is user API",
//     });
// });

module.exports = router;
