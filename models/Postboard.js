const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
	message: String,
	author: String,
	color: String,
	authorId: Schema.Types.ObjectId,
});

const postboardSchema = new Schema({
	name: String,
	secretCode: { type: Number, unique: true },
	creatorId: Schema.Types.ObjectId,
	messages: [messageSchema],
});

const pbModel = mongoose.model("Postboard", postboardSchema);

module.exports = pbModel;
