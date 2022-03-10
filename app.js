const express = require("express");
const router = require("./itemRoutes");
const app = express();

const itemRoutes = require("./itemRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/items", itemRoutes);

router.get("/");

module.exports = app;
