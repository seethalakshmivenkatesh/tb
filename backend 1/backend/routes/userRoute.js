const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");

router.post("/register", userController.handleRegisterUser);
router.post("/login", userController.handlelogin);
router.post("/refresh-token", userController.getNewToken);
router.post("/logout", userController.handleLogout);
router.put("/theme", verifyToken, userController.updateTheme);
module.exports = router;
