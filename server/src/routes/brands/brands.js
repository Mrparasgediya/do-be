const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const utils = require("../../utils/server.utils");
const brandsUtils = require("./brands.utils");
const { api_key, api_secret, cloud_name } = require("../../config");

const cloudinaryConfig = {
  api_key,
  api_secret,
  cloud_name,
};

router.post("/brands/image", upload.single("image"), async (req, res) => {
  try {
    const uploadRes = await utils.uploadImage(
      cloudinaryConfig,
      req,
      "do-be-brand-image"
    );
    res.send(brandsUtils.getDataFromResponse(uploadRes));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/brands/image", async (req, res) => {
  const { publicId } = req.body;
  try {
    const deleteRes = await utils.deleteImage(cloudinaryConfig, publicId);
    res.send(deleteRes);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/brands/logo", upload.single("image"), async (req, res) => {
  try {
    const uploadRes = await utils.uploadImage(
      cloudinaryConfig,
      req,
      "do-be-brand-logo"
    );
    res.send(brandsUtils.getDataFromResponse(uploadRes));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/brands/logo", async (req, res) => {
  const { publicId } = req.body;
  try {
    const deleteRes = await utils.deleteImage(cloudinaryConfig, publicId);
    res.send(deleteRes);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
