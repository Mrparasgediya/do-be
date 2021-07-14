const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const utils = require("../../utils/server.utils");
const collectionsUtils = require("./collections.utils");
const { api_key, api_secret, cloud_name } = require("../../config");

const cloudinaryConfig = {
  api_key,
  api_secret,
  cloud_name,
};

router.post("/collections/image", upload.single("image"), async (req, res) => {
  try {
    const uploadRes = await utils.uploadImage(
      cloudinaryConfig,
      req,
      "do-be-collection"
    );

    res.send(collectionsUtils.getDataFromResponse(uploadRes));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/collections/image", async (req, res) => {
  const { publicId } = req.body;
  try {
    const deleteRes = await utils.deleteImage(cloudinaryConfig, publicId);
    res.send(deleteRes);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
