import { db } from "./firebase.utils";
import { staticRef, addStaticDoc } from "./static.utils";

const newslettersRef = db.collection("newsletterEmails");

export const getNewsletterImage = async () => {
  try {
    const query = staticRef.where("name", "==", "newsletter");
    const querySnapshot = await query.get();
    if (querySnapshot.docs.length === 0) return null; // here we will return if doc is not there
    const firstDoc = querySnapshot.docs[0];
    return { id: firstDoc.id, ...firstDoc.data() };
  } catch (error) {
    console.log(error);
  }
};
export const addNewsletterImage = async (newsletterData) => {
  const data = { ...newsletterData, name: "newsletter" };
  return addStaticDoc(data);
};

export const updateNewsletterImage = async (newletterId, image) => {
  try {
    const newsletterRef = staticRef.doc(newletterId);
    await newsletterRef.update({ image: image });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNewsletterImage = async (newsletterDocId) => {
  try {
    const newletterDoc = staticRef.doc(newsletterDocId);
    await newletterDoc.delete();
  } catch (error) {
    console.log(error);
  }
};

export const getNewsletterEmails = async () => {
  try {
    const newslettersSnapshot = await newslettersRef.orderBy("createdAt").get();
    return newslettersSnapshot.docs.reduce(
      (newsletters, currDoc) => ({
        [currDoc.id]: { ...currDoc.data() },
        ...newsletters,
      }),
      {}
    );
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const isNewsletterEmailExists = async (email) => {
  const query = newslettersRef.where("email", "==", email);

  try {
    const querySnapshot = await query.get();
    return querySnapshot.docs.length > 0 ? true : false;
  } catch (error) {
    console.error(error);
  }
};

export const addNewsletterEmail = async (email) => {
  try {
    const newNewsletter = {
      email: email,
      createdAt: Date.now(),
    };
    const newNewsletterDoc = await newslettersRef.add(newNewsletter);
    return { [newNewsletterDoc.id]: { ...newNewsletter } };
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const deleteNewsLetterEmail = async (newsletterId) => {
  try {
    const foundNewsletter = await newslettersRef.doc(newsletterId); // found newletter
    await foundNewsletter.delete(); // delte user
  } catch (error) {
    console.log(error);
  }
};
