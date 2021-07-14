import API from "api";

export const readFileAndGetDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => resolve(fileReader.result);
    fileReader.onerror = (error) => reject(error);
  });
};

export const uploadResource = async (url, data) => {
  try {
    const res = await API.post(url, data);
    return [res.data, null];
  } catch (error) {
    if (error.response) {
      const { data, statusText, status } = error.response;
      return [null, new Error(data.message || `${status}: ${statusText}`)];
    } else {
      return [null, error];
    }
  }
};

export const deleteResources = async (url, publicId) => {
  const data = publicId ? { data: { publicId } } : {};
  try {
    await API.delete(url, data);
    return [true, null];
  } catch (error) {
    if (error.response) {
      const { data, statusText, status } = error.response;
      return [null, new Error(data.message || `${status}: ${statusText}`)];
    } else {
      return [null, error];
    }
  }
};

// brand image

export const uploadBrandImage = async (imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  return uploadResource("/brands/image", data);
};

export const deleteBrandImage = (publicId) => {
  return deleteResources("/brands/image", publicId);
};

export const updateBrandImage = async (
  publicId,
  imageFile,
  setCurrentProgress
) => {
  try {
    let error, newImage;
    // delete old image
    setCurrentProgress("Deleting Old Image");
    [, error] = await deleteBrandImage(publicId);
    if (error) throw new Error(error);
    // upload new image
    setCurrentProgress("Uploding new Image");
    [newImage, error] = await uploadBrandImage(imageFile);
    if (error) throw new Error(error);

    return [newImage, null];
  } catch (error) {
    return [null, error];
  }
};

// brand logo
export const uploadBrandLogo = (imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  return uploadResource("/brands/logo", data);
};

export const deleteBrandLogo = (publicId) => {
  return deleteResources("/brands/logo", publicId);
};

export const updateBrandLogo = async (
  publicId,
  imageFile,
  setCurrentProgress
) => {
  try {
    let error, newLogo;
    // delete old image
    setCurrentProgress("Deleting Old Logo");
    [, error] = await deleteBrandLogo(publicId);
    if (error) throw new Error(error);
    // upload new image
    setCurrentProgress("Uploading New Logo")[(newLogo, error)] =
      await uploadBrandLogo(imageFile);
    if (error) throw new Error(error);
    return [newLogo, null];
  } catch (error) {
    return [null, error];
  }
};

// newsletter
export const uploadNewsletterImage = (imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  return uploadResource("/static/newsletter/image", data);
};

export const deleteNewsletterImage = () => {
  return deleteResources("/static/newsletter/image", {});
};

export const updateNewsletterImage = async (imageFile) => {
  try {
    await deleteNewsletterImage();
    const res = await uploadNewsletterImage(imageFile);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// brand video

export const uploadBrandVideoImage = (imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  return uploadResource("/static/brandvideo/image", data);
};

export const deleteBrandVideoImage = (publicId) => {
  return deleteResources("/static/brandvideo/image", publicId);
};

export const updateBrandVideoImage = async (publicId, imageFile) => {
  try {
    await deleteBrandVideoImage(publicId);
    const imageRes = await uploadBrandVideoImage(imageFile);
    return imageRes;
  } catch (error) {
    console.log(error);
  }
};

// collection image
export const uploadCollectionImage = (imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  return uploadResource("/collections/image", data);
};

export const deleteCollectionImage = (publicId) => {
  return deleteResources("/collections/image", publicId);
};

export const updateCollectionImage = async (publicId, imageFile) => {
  try {
    await deleteCollectionImage(publicId);
    const imageRes = await uploadCollectionImage(imageFile);
    return imageRes;
  } catch (error) {
    console.log(error);
  }
};

//  items images
export const uploadItemImages = async (imageFilesArr, itemId) => {
  const data = new FormData();
  imageFilesArr.forEach((file) => data.append("images", file));
  data.append("itemId", itemId);
  try {
    const uploadRes = await API.post("/item/images", data);
    return [uploadRes.data, undefined];
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    }
    return [undefined, error];
  }
};

export const deleteAllItemImages = async (itemId) => {
  try {
    await API.delete("/item/images", {
      data: { itemId: itemId },
    });
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteItemImage = async (publicId) => {
  return deleteResources("/item/image", publicId);
};

export const addItemImage = (itemId, imageNo, imageFile) => {
  const data = new FormData();
  data.append("image", imageFile);
  data.append("imageNo", imageNo);
  data.append("itemId", itemId);
  return uploadResource("/item/image", data);
};

export const updateItemImage = async (publicId, itemId, imageNo, imageFile) => {
  try {
    await deleteItemImage(publicId);
    const uploadRes = await addItemImage(itemId, imageNo, imageFile);
    return uploadRes;
  } catch (error) {
    console.log(error);
  }
};

export const getItemNextImageNo = (item) => {
  const imageKeys = Object.keys(item.images);
  const lastImageKey = imageKeys[imageKeys.length - 1];
  return parseInt(lastImageKey.split("/")[3]) + 1;
};
