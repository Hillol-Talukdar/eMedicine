const express = require("express");

const router = express.Router();

router.get("/user-create-or-update", (req, res) => {
    res.json({
        data: "This is create or update user",
    });
});

module.exports = router;
