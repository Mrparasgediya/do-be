const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const getDataFromItemImageResponse = (response) => {
  const [smallBlur, smallOrg, medBlur, medOrg, largeBlur, largeOrg] =
    response.eager;

  return {
    publicId: response.public_id,
    src: {
      org: { url: response.secure_url },
      small: { blur: smallBlur.secure_url, url: smallOrg.secure_url },
      med: { blur: medBlur.secure_url, url: medOrg.secure_url },
      large: { blur: largeBlur.secure_url, url: largeOrg.secure_url },
    },
  };
};

const uploadMultipleItemImages = async (cloudinaryConfig, req, itemName) => {
  let currentImageCount = 1;
  cloudinary.config(cloudinaryConfig);

  const uploadItemImage = (fileBuffer) =>
    new Promise((resolve, reject) => {
      // upload file via stream
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          public_id: `/${itemName}/${currentImageCount}`,
          upload_preset: "do-be-items",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      currentImageCount++;

      // create read stream to read buffer and upload resorce
      streamifier.createReadStream(fileBuffer).pipe(stream);
    });

  const imagesRes = [];
  try {
    for (let file of req.files) {
      const fileRes = await uploadItemImage(file.buffer);
      imagesRes.push(getDataFromItemImageResponse(fileRes));
    }
  } catch (error) {
    return imagesRes.length ? [imagesRes, error] : [null, error];
  }

  return [imagesRes, null];

  // return new Promise(async (resolve, reject) => {
  //   Promise.all(
  //     req.files.map(async (file) => await uploadItemImage(file.buffer))
  //   )
  //     .then((res) => {
  //       const data = res.map((res) => getDataFromItemImageResponse(res));
  //       resolve(data);
  //     })
  //     .catch((error) => reject(error));
  // });
};

module.exports = {
  getDataFromItemImageResponse,
  uploadMultipleItemImages,
};
