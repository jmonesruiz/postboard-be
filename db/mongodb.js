const mongoose = require("mongoose");

mongoose.connection.on("open", () => console.log("Connected to database"));

async function connectDb({ host, port, dbName }) {
	const uri = `mongodb://${host}:${port}/${dbName}`;
	await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectDb;
