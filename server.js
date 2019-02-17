require("dotenv").config();
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

server.get("/", (req, res) => {
  res.status(200).send("<h1>HEllo ! Welcome to my API jbmiranda</h1> ");
});

//https://localhost:5000/api/contact
server.use("/api/contact", contactRoute);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`
  --------------------------------------------------------------
                  Server running on port ${port}
  --------------------------------------------------------------

  `);
});
