const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadImage = (
  cloudinaryConfig,
  req,
  upload_preset,
  cloudinarUploadOptions
) => {
  cloudinary.config(cloudinaryConfig); // setting up cloudinary config
  return new Promise((resolve, reject) => {
    // upload file via stream
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        upload_preset,
        timeout: 2 * 60 * 1000,
        ...cloudinarUploadOptions,
      },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
    // create read stream to read buffer and upload resorce
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

const deleteResource = (publicId, resource_type) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .destroy(publicId, { resource_type })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const deleteImage = (cloudinaryConfig, publicId) => {
  cloudinary.config(cloudinaryConfig); // setting up cloudinary config
  return deleteResource(publicId, "image");
};

module.exports = { uploadImage, deleteImage };
