const express = require("express");
const router = express.Router();

const pbController = require("../controllers/pbController");

//create postboard
router.post("/", pbController.createPostboard);

//get postboard
router.get("/:id", pbController.getPostboard);

//get postboard with secret code
router.get("/find/:secretcode", pbController.findPostboard);

//update postboard
router.put("/:id", pbController.updatePostboard);

//delete postboard
router.delete("/:id", pbController.deletePostboard);

//post message to a postboard
router.post("/:id", pbController.postMessage);

//edit posted message
router.put("/:id/:messageid", pbController.editMessage);

//delete posted messages
router.delete("/:id/:messageid", pbController.deleteMessage);

//get all postboards --- JUST FOR TESTING
router.get("/", pbController.getAllPostboards);

module.exports = router;
