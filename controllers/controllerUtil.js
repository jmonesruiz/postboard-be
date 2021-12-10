module.exports.sendJsonResponse = (res, status, data) => {
	res.status(status).send(data);
};
