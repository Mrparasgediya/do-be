const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const utils = require("../../utils/server.utils");
const staticUtils = require("./static.utils");
const cloudinary = require("cloudinary").v2;
const { api_key, api_secret, cloud_name } = require("../../config");

const cloudinaryConfig = {
  api_key,
  api_secret,
  cloud_name,
};

router.post(
  "/static/brandvideo/image",
  upload.single("image"),
  async (req, res) => {
    try {
      const uploadRes = await utils.uploadImage(
        cloudinaryConfig,
        req,
        "do-be-brand-video-image"
      );
      res.send(staticUtils.getBrandVideoImageDataFromResponse(uploadRes));
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.delete("/static/brandvideo/image", async (req, res) => {
  cloudinary.config(cloudinaryConfig);
  try {
    // search public ids from folder
    const searchRes = await cloudinary.search
      .expression(`folder:do-be/static/video/*`)
      .execute();
    //  map search res to publicids of resources
    const publicIds = searchRes.resources.map((resource) => resource.public_id);
    await cloudinary.api.delete_resources(publicIds); // delete all images
    const deleteRes = await cloudinary.api.delete_folder(`do-be/static/video`);
    res.send(deleteRes);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(
  "/static/newsletter/image",
  upload.single("image"),
  async (req, res) => {
    try {
      const uploadRes = await utils.uploadImage(
        cloudinaryConfig,
        req,
        "do-be-newsletter"
      );
      res.send(staticUtils.getNewsletterImageDataFromResponse(uploadRes));
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
);

router.delete("/static/newsletter/image", async (req, res) => {
  try {
    cloudinary.config(cloudinaryConfig);
    // search public ids from folder
    const searchRes = await cloudinary.search
      .expression(`folder:do-be/static/newsletter/*`)
      .execute();
    //  map search res to publicids of resources
    const publicIds = searchRes.resources.map((resource) => resource.public_id);
    await cloudinary.api.delete_resources(publicIds); // delete all images
    const deleteRes = await cloudinary.api.delete_folder(
      `do-be/static/newsletter`
    );

    res.send(deleteRes);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
