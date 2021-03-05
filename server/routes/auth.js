const express = require("express");

const router = express.Router();

//middlewares
const {authCheck} = require('../middlewares/auth') 

//controller
const { userCreateOrUpdate } = require("../controllers/auth");

router.post("/user-create-or-update", authCheck, userCreateOrUpdate);

module.exports = router;
