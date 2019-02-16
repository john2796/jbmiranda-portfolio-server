const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const contactRoute = require("./routes/api/contacts");

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger("dev"));

server.use("/api/contact", contactRoute);

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
