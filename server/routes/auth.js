const express = require("express");

const router = express.Router();

//middlewares
const {authCheck, adminCheck} = require('../middlewares/auth') 

//controller
const { userCreateOrUpdate, currentUser } = require("../controllers/auth");

router.post("/user-create-or-update", authCheck, userCreateOrUpdate);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
