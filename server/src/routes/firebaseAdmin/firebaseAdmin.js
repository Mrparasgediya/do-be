const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const AES = require("crypto-js/aes");
const UTF8 = require("crypto-js/enc-utf8");
const { crypto_secret, firebase_admin_credentials } = require("../../config");

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(
      Buffer.from(firebase_admin_credentials, "base64").toString("ascii")
    )
  ),
});

// create new user
router.post("/firebase/admin/auth/users", async (req, res) => {
  // get encrypted data from frontend
  const { userInfo } = req.body;
  // decrypt it
  const bytes = AES.decrypt(userInfo, crypto_secret);
  // get info from encrypted data
  const { email, password } = JSON.parse(bytes.toString(UTF8));

  if (
    !email ||
    !password ||
    email.length === 0 ||
    password.length < 8 ||
    password.length > 12
  )
    return res.status(400).send({
      code: "invalid values",
      message:
        "enter valid parameter values and parameters must be email, password, displayName",
    });

  try {
    const newUser = await adminApp.auth().createUser({
      email,
      password,
      emailVerified: false,
    });
    const {
      uid,
      email: userEmail,
      emailVerified,
      disabled,
      providerData,
    } = newUser;
    res.send({
      user: {
        uid,
        email: userEmail,
        emailVerified,
        name: null,
        phoneNumber: null,
        disabled,
        provider: providerData[0].providerId,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/firbease/admin/auth/users/:uid/disable", async (req, res) => {
  const { uid } = req.params;
  try {
    await adminApp.auth().updateUser(uid, { disabled: true });
    res.send({ result: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/firebase/admin/auth/users/:uid/enable", async (req, res) => {
  const { uid } = req.params;
  try {
    await adminApp.auth().updateUser(uid, { disabled: false });
    res.send({ result: "ok" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// update user

router.put("/firebase/admin/auth/users/:uid", async (req, res) => {
  const { uid } = req.params;
  const validKeys = ["displayName", "email", "emailVerified", "password"];
  const bodyKeys = Object.keys(req.body);
  let isValideOperation = bodyKeys.every((key) => validKeys.includes(key));

  if (!isValideOperation)
    return res.send({
      code: "invalid operation",
      message: "Enter valid update parameters",
      hint: `valid update parameters are [ ${validKeys.join(" , ")} ]`,
    });

  try {
    await adminApp.auth().updateUser(uid, req.body);
    res.send({ result: "ok" });
  } catch (error) {
    res.status(400).send({ code: error.code, message: error.message });
  }
});

// delete user
router.delete("/firebase/admin/auth/users/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    await adminApp.auth().deleteUser(uid);
    res.send({ result: "ok" });
  } catch (error) {
    res.status(400).send({ code: error.code, message: error.message });
  }
});

module.exports = router;
