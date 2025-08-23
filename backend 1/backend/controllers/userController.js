
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Token = require("../models/token");
const { generateToken, generateRefreshToken } = require("../utils/token");



const handleRegisterUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const handlelogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    const refreshToken = await generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        themeColor: user.themeColor
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const updateTheme = async (req, res) => {
  try {
    const { themeColor } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { themeColor },
      { new: true }
    );

    res.json({
      message: "Theme updated successfully",
      user: {
        id: user._id,
        username: user.username,
        themeColor: user.themeColor,
      },
    });

  } catch (error) {
    console.error("Update theme error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





const getNewToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const stored = await Token.findOne({ token: refreshToken });
    if (!stored) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        console.error("JWT verify error:", err);
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Fetch fresh user data so we can return themeColor
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newAccessToken = generateToken({
        id: user._id,
        username: user.username,
      });

      return res.json({
        token: newAccessToken,
        user: {
          id: user._id,
          username: user.username,
          themeColor: user.themeColor, // ✅ include themeColor
        },
      });
    });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




const handleLogout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {

      await Token.findOneAndDelete({ token: refreshToken });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
    }

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  handleRegisterUser,
  handlelogin,
  getNewToken,
  handleLogout,
  updateTheme
};
