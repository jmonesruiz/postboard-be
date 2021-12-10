const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const secretCodeSchema = new Schema({
	_id: String,
	counter: Number,
});

const secretCodeModel = mongoose.model("SecretCode", secretCodeSchema);

module.exports = secretCodeModel;
