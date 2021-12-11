const mongoose = require("mongoose");

const pbModel = require("../models/Postboard");
const secretCodeModel = require("../models/SecretCode");
const { sendJsonResponse } = require("./controllerUtil");

async function genSecretCode() {
	return secretCodeModel
		.findByIdAndUpdate("pbSecretCode", { $inc: { counter: 1 } })
		.then(async (result) => {
			if (!result) {
				await secretCodeModel.create({ _id: "pbSecretCode", counter: 1 });
				return Promise.resolve({ _id: "pbSecretCode", counter: 0 });
			} else {
				return Promise.resolve(result);
			}
		})
		.then((result) => {
			return result.counter;
		})
		.catch((err) => {
			throw err;
		});
}

module.exports.getAllPostboards = (req, res) => {
	pbModel
		.find()
		.then((result) => sendJsonResponse(res, 200, result))
		.catch((err) => sendJsonResponse(res, 400, err));
};

module.exports.createPostboard = (req, res) => {
	if (req.body.name && req.body.creatorId) {
		genSecretCode()
			.then((newSecretCode) => {
				return pbModel.create({
					name: req.body.name,
					secretCode: newSecretCode,
					creatorId: req.body.creatorId,
					messages: [],
				});
			})
			.then((result) => sendJsonResponse(res, 201, result))
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 400, { message: "Incomplete request body" });
};

module.exports.getPostboard = (req, res) => {
	if (req.params && req.params.id) {
		pbModel
			.findById(req.params.id)
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "Postboard not found" });
				else sendJsonResponse(res, 200, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.findPostboard = (req, res) => {
	if (req.params && req.params.secretcode) {
		pbModel
			.find({ secretCode: req.params.secretcode })
			.then((result) => {
				if (!result[0]) sendJsonResponse(res, 404, { message: "Postboard not found" });
				else sendJsonResponse(res, 200, { _id: result[0]._id });
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.updatePostboard = (req, res) => {
	if (req.params && req.params.id) {
		let mod = {};
		if (req.body.name) mod.name = req.body.name;
		pbModel
			.findByIdAndUpdate(req.params.id, mod)
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "Postboard not found" });
				else sendJsonResponse(res, 200, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.deletePostboard = (req, res) => {
	if (req.params && req.params.id) {
		pbModel
			.findByIdAndRemove(req.params.id)
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "Postboard not found" });
				else sendJsonResponse(res, 204, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.postMessage = (req, res) => {
	if (req.params && req.params.id) {
		if (req.body.message && req.body.author && req.body.color && req.body.authorId) {
			let newMessage = {
				message: req.body.message,
				author: req.body.author,
				color: req.body.color,
				authorId: req.body.authorId,
			};
			pbModel
				.findByIdAndUpdate(req.params.id, { $push: { messages: newMessage } })
				.then((result) => {
					if (!result) sendJsonResponse(res, 404, { message: "Postboard not found" });
					else sendJsonResponse(res, 200, result);
				})
				.catch((err) => sendJsonResponse(res, 400, err));
		} else sendJsonResponse(res, 400, { message: "Incomplete message object in request body" });
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.editMessage = (req, res) => {
	if (req.params && req.params.id && req.params.messageid) {
		if (req.body.message && req.body.author && req.body.color) {
			pbModel
				.updateOne(
					{ _id: req.params.id, "messages._id": req.params.messageid },
					{
						$set: {
							"messages.$.message": req.body.message,
							"messages.$.color": req.body.color,
							"messages.$.author": req.body.author,
						},
					}
				)
				.then((result) => {
					if (!result) sendJsonResponse(res, 404, { message: "Postboard not found" });
					else sendJsonResponse(res, 200, result);
				})
				.catch((err) => sendJsonResponse(res, 400, err));
		} else sendJsonResponse(res, 400, { message: "Incomplete message object in request body" });
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};

module.exports.deleteMessage = (req, res) => {
	if (req.params && req.params.id && req.params.messageid) {
		pbModel
			.findByIdAndUpdate(req.params.id, {
				$pull: { messages: { _id: req.params.messageid } },
			})
			.then((result) => {
				if (!result) sendJsonResponse(res, 404, { message: "Postboard not found" });
				else sendJsonResponse(res, 200, result);
			})
			.catch((err) => sendJsonResponse(res, 400, err));
	} else sendJsonResponse(res, 404, { message: "No ID in request" });
};
