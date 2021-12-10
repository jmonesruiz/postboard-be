const userModel = require("../models/User");
const { sendJsonResponse } = require("./controllerUtil");

module.exports.createUser = (req, res) => {
	userModel
		.create({})
		.then((result) => sendJsonResponse(res, 201, result))
		.catch((err) => sendJsonResponse(res, 400, err));
};

module.exports.getUser = (req, res) => {
	if (req.params && req.params.id) {
		userModel
			.findById(req.params.id)
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "User not found" });
				else sendJsonResponse(res, 200, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.updateUser = (req, res) => {
	if (req.params && req.params.id) {
		userModel
			.findByIdAndUpdate(req.params.id, req.body)
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "User not found" });
				else sendJsonResponse(res, 200, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.getAllUsers = (req, res) => {
	userModel
		.find()
		.then((result) => sendJsonResponse(res, 200, result))
		.catch((err) => sendJsonResponse(res, 400, err));
};

module.exports.deleteUser = (req, res) => {
	if (req.params && req.params.id) {
		userModel
			.findByIdAndRemove(req.params.id)
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "User not found" });
				else sendJsonResponse(res, 204, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};
