const User = require("../models/user");

exports.userCreateOrUpdate = async (req, res) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        { name, picture },
        { new: true }
    );

    if (user) {
        console.log("USER UPDATED", user);
        res.json(user);
    } else {
        const newUser = await new User({
            name,
            picture,
            email,
        }).save();

        console.log("USER CREATED", newUser);
        res.json(newUser);
    }
};
