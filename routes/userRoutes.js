const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

//create user
router.post("/", userController.createUser);

//get user
router.get("/:id", userController.getUser);

//update user
router.put("/:id", userController.updateUser);

//get all users --- JUST FOR TESTING
router.get("/", userController.getAllUsers);

//delete user --- JUST FOR TESTING
router.delete("/:id", userController.deleteUser);

module.exports = router;
