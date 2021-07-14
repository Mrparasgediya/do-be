const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const {
  contactus_email,
  google_client_id,
  google_client_refres_token,
  google_client_secret,
} = require("../../config");

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      google_client_id,
      google_client_secret,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: google_client_refres_token,
    });

    const getAccessToken = async () => {
      try {
        const token = await oauth2Client.getAccessToken();
        return [token, null];
      } catch (error) {
        return [null, error];
      }
    };

    const [accessToken, error] = await getAccessToken();
    if (error) throw new Error(error);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: contactus_email,
        clientId: google_client_id,
        clientSecret: google_client_secret,
        refreshToken: google_client_refres_token,
        accessToken: accessToken.token,
        expires: accessToken.res.data.expiry_date,
      },
    });
    return [transporter, null];
  } catch (error) {
    return [null, error];
  }
};

router.post("/contactus/reply", async (req, res) => {
  const { recieverEmail, subject, name, reply } = req.body;

  try {
    if (!recieverEmail || !recieverEmail.includes("@") || !subject || !reply) {
      throw new Error("Enter valid data");
    }

    const [transporter, error] = await createTransporter();

    if (error) throw new Error(error);

    const html = await ejs.renderFile(
      path.join("src", "views", "contactUsReplay.ejs"),
      { name, reply }
    );

    const mailOptions = {
      from: contactus_email,
      to: recieverEmail,
      subject,
      html,
    };

    const { accepted, rejected } = await transporter.sendMail(mailOptions);

    res.send({
      accepted,
      rejected,
      status: "ok",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
