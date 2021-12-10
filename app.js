const express = require("express");

const pbRoutes = require("./routes/pbRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/v1/pb", pbRoutes);
app.use("/v1/users", userRoutes);

module.exports = app;
