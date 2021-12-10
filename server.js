require("dotenv").config();

const connectDb = require("./db/mongodb");
const { appConfig, dbConfig } = require("./config");

const app = require("./app");

async function initApp(appConfig, dbConfig) {
	try {
		await connectDb(dbConfig);
		app.listen(appConfig.port, () => {
			console.log(`Listening on port ${appConfig.port}`);
		});
	} catch {
		console.error(e);
		process.exit(0);
	}
}

initApp(appConfig, dbConfig);
