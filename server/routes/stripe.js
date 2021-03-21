const express = require("express");

const router = express.Router();

const { createPaymentIntent } = require("../controllers/stripe.js");

const { route } = require("./user");

const { authCheck } = require("../middlewares");

router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
