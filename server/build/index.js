"use strict";
const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
require("dotenv").config({
    path: "../.env"
});
const PORT = process.env.PORT || 4000;
const app = express();
app.listen(PORT, () => {
    console.log("Server is running ...");
});
