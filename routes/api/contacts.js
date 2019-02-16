const express = require("express");
const server = express.Router();

// @route    GET api/contact/testing
// @desc     testing
// @Access   Public
server.get("/testing", (req, res) => {
  res.send("Test works");
});

module.exports = server;
