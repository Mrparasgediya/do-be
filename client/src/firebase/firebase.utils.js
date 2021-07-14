import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  //  firebase config
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const signInWithGoogle = async () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //google provider for singin
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // set persistance of user local
    return auth.signInWithPopup(googleAuthProvider);
  } catch (error) {
    console.log(error);
  }
};

export const signInWithFacebook = async () => {
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider(); //facebook provider for singin

  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // set persistance of user local
    return auth.signInWithPopup(facebookAuthProvider);
  } catch (error) {
    console.log(error);
  }
};

export const singinWithEmailAndPassword = async (email, password) => {
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // set persistance of user local
    return auth.signInWithEmailAndPassword(email, password); // sign in with email and password
  } catch (error) {
    console.log(error);
  }
};

export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); // set persistance of user local
    return auth.createUserWithEmailAndPassword(email, password); // sign up with email and password
  } catch (error) {
    console.log(error);
  }
};

export const getBrandsAndCollectionsIdsBySearchQuery = async (searchText) => {
  const queryArr = searchText.toLowerCase().split(" ");
  try {
    const brands = await db
      .collection("brands")
      .where("name", "in", queryArr)
      .get();
    const collections = await db
      .collection("collections")
      .where("name", "in", queryArr)
      .get();
    return {
      brands: brands.docs.map((doc) => doc.id),
      collections: collections.docs.map((doc) => doc.id),
    };
  } catch (error) {
    console.log(error);
  }
};
