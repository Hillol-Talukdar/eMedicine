const express = require("express");

const router = express.Router();

const { userCreateOrUpdate } = require("../controllers/auth");

router.post("/user-create-or-update", userCreateOrUpdate);

module.exports = router;
