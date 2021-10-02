const express = require("express.js");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

let initicalPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initicalPath));
app.use(express.json());
app.use(express.urlenconded());

app.get("/", (req, res) => {
  res.sendFile(path.join(initicalPath, "index.html"));
});

app.post("/mail", (req, res) => {
  const { firstname, lastname, email, msg } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "sender email",
    to: "receiver email",
    subject: "Postfolio",
    text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`,
  };

  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json("opps! it seems like some error occured plz. try again.");
    } else {
      res.json(
        "thanks for e-mailing me. I will reply to you within 2 working days"
      );
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running now...");
});
