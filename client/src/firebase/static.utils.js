import { db } from "./firebase.utils";

export const staticRef = db.collection("static");

export const addStaticDoc = async (dataToUpload) => {
  try {
    const data = { ...dataToUpload, createdAt: Date.now() };
    const snapshot = await staticRef.add(data);
    return { id: snapshot.id, ...data };
  } catch (error) {
    console.log(error);
  }
};

export const updateStaticDoc = async (docId, dataToUpdate) => {
  try {
    const foundDoc = staticRef.doc(docId);
    await foundDoc.update({ ...dataToUpdate });
    return;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStaticDoc = async (docId) => {
  try {
    const docRef = staticRef.doc(docId);
    await docRef.delete();
    return;
  } catch (error) {
    console.log(error);
  }
};
