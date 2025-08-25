
// const jwt = require("jsonwebtoken");
// const Token = require("../models/token");


// const generateToken = (user) => {
//     return jwt.sign(
//         { id: user._id, username: user.username },
//         process.env.JWT_SECRET,
//         { expiresIn: "1m" }
//     );
// };


// const generateRefreshToken = async (user) => {
//     const token = jwt.sign(
//         { id: user._id, username: user.username },
//         process.env.JWT_REFRESH_SECRET,
//         { expiresIn: "7d" }
//     );

//     await Token.findOneAndUpdate(
//         { userId: user._id },
//         { token },
//         { upsert: true, new: true }
//     );

//     return token;
// };

// module.exports = { generateToken, generateRefreshToken };







const jwt = require("jsonwebtoken");
const Token = require("../models/token");


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id.toString(), username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
    );
};

const generateRefreshToken = async (user) => {
    const token = jwt.sign(
        { id: user._id.toString(), username: user.username },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );

    await Token.findOneAndUpdate(
        { userId: user._id },
        { token },
        { upsert: true, new: true }
    );

    return token;
};



module.exports = { generateToken, generateRefreshToken };
