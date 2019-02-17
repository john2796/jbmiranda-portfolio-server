const express = require("express");
const server = express.Router();
const nodemailer = require("nodemailer");
const db = require("../../data/dbConfig");
//nodemailer connectt server
const transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USR,
    pass: process.env.PASS
  }
};
const transporter = nodemailer.createTransport(transport);
transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to take messages");
  }
});

const errorHelper = (statusCode, message, res) => {
  res.status(statusCode).json({ message });
};
const getAllContact = async (req, res) => {
  try {
    const contact = await db("contact");
    res.status(200).json(contact);
  } catch (err) {
    return errorHelper(500, "internal server error", res);
  }
};
// @route    GET api/contact/testing
// @desc     testing
// @Access   Public
server.get("/", async (req, res) => {
  getAllContact(req, res);
});
// @route    GET api/conatct/:id
// @desc     get single item
// @Access   Public
server.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await db("contact")
      .where({ id })
      .first();
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "contact not found" });
    }
  } catch (err) {
    return errorHelper(500, "server internal error", res);
  }
});
// @route    GET api/contact
// @desc     send email to me once they submit form
// @Access   Public
server.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const mail = {
    from: name,
    to: process.env.USR,
    subject: `New Message from Portfolio Form`,
    text: `from name: ${name} ${email}  ${message}`
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ message: "fail" });
    } else {
      res.json({ message: "success" });
    }
  });
});
// @route    GET api/contact/:id
// @desc     delete a contact
// @Access   Public
server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await db("contact")
      .where({ id })
      .del();
    if (contact) {
      getAllContact(req, res);
    } else {
      res.status(404).json({ message: "contact not found" });
    }
  } catch (err) {
    return errorHelper(500, "server internal error", res);
  }
});

module.exports = server;
