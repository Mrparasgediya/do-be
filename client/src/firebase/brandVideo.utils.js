import { storage } from "./firebase.utils";
import { getBrandById } from "./brands.utils";
import {
  staticRef,
  updateStaticDoc,
  addStaticDoc,
  deleteStaticDoc,
} from "./static.utils";

export const getBrandVideo = async () => {
  try {
    const query = staticRef.where("name", "==", "brandVideo");
    const querySnapshot = await query.get();
    if (querySnapshot.docs.length === 0) return null;
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    const [brand, error] = await getBrandById(data.brand);
    if (error) throw new Error(error);
    data.brand = brand;
    return { id: doc.id, ...data };
  } catch (error) {
    console.log(error);
  }
};

export const addBrandVideo = (
  video,
  image,
  brandId,
  headingText,
  displayBrandIcon
) => {
  const brandVideo = {
    name: "brandVideo",
    video: video,
    image: image,
    brand: brandId,
    headingText: headingText,
    displayBrandIcon: displayBrandIcon,
    createdAt: Date.now(),
  };
  return addStaticDoc(brandVideo);
};

export const updateBrandVideo = (docId, dataToUpdate) =>
  updateStaticDoc(docId, dataToUpdate);

export const deleteBrandVideo = (brandVideoId) => deleteStaticDoc(brandVideoId);
// storage functions

export const uploadBrandVideoFile = async (
  file,
  videoName,
  getUploadPercentage
) => {
  const videoStorageRef = storage
    .ref("/brandVideos")
    .child(`${videoName}.${file.type.split("/")[1]}`);

  return new Promise((resolve, reject) => {
    const uploadTask = videoStorageRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const { bytesTransferred, totalBytes } = snapshot;
        const percentage = (bytesTransferred / totalBytes) * 100;
        getUploadPercentage(percentage.toFixed(2));
      },
      (error) => reject(error),
      async () => {
        try {
          const dowloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
          resolve(dowloadUrl);
        } catch (error) {
          console.log(error);
        }
      }
    );
  });
};

export const deleteBrandVideosFromStorage = async () => {
  const brandsVideosRef = storage.ref("brandVideos");
  try {
    const filesList = await brandsVideosRef.listAll();
    for (const file of filesList.items) {
      await file.delete();
    }
  } catch (error) {
    console.log(error);
  }
};
