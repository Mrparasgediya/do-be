const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const cloudinary = require("cloudinary").v2;
const utils = require("../../utils/server.utils");
const {
  items_api_key,
  items_api_secret,
  items_cloud_name,
} = require("../../config");
const {
  uploadMultipleItemImages,
  getDataFromItemImageResponse,
} = require("./items.utils");

const cloudinaryConfig = {
  api_key: items_api_key,
  api_secret: items_api_secret,
  cloud_name: items_cloud_name,
};

router.post("/item/images", upload.array("images"), async (req, res) => {
  const { itemId } = req.body;
  let dataRes, error;
  try {
    [dataRes, error] = await uploadMultipleItemImages(
      cloudinaryConfig,
      req,
      itemId
    );
    if (error) throw new Error(error);
    res.send(dataRes);
  } catch (error) {
    res.status(400).send({ uploadedImages: dataRes, message: error.message });
  }
});

router.delete("/item/images", async (req, res) => {
  cloudinary.config(cloudinaryConfig);
  const { itemId } = req.body;
  try {
    // search public ids from folder
    const searchRes = await cloudinary.search
      .expression(`folder:do-be/items/${itemId}/*`)
      .execute();
    //  map search res to publicids of resources
    const publicIds = searchRes.resources.map((resource) => resource.public_id);

    await cloudinary.api.delete_resources(publicIds); // delete all images
    const deleteRes = await cloudinary.api.delete_folder(
      `do-be/items/${itemId}`
    );
    res.send(deleteRes);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/item/image", async (req, res) => {
  const { publicId } = req.body;
  try {
    const deleteRes = await utils.deleteImage(cloudinaryConfig, publicId);
    res.send(deleteRes);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/item/image", upload.single("image"), async (req, res) => {
  const { itemId, imageNo } = req.body;
  try {
    const uploadRes = await utils.uploadImage(
      cloudinaryConfig,
      req,
      "do-be-items",
      { public_id: `/${itemId}/${imageNo}` }
    );
    res.send(getDataFromItemImageResponse(uploadRes));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
