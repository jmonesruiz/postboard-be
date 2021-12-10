const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	lastAuthorName: { type: String, default: "guest" },
	lastColor: { type: String, default: "#99D4E6" },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
