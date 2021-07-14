import firebase, { db, auth } from "./firebase.utils";
const usersRef = db.collection("users");

export const createUserProfileDoc = async (userAuth) => {
  try {
    // check the user is exists or not with other provider
    const isUserLoggedInWithNewProvider =
      await checkUserLoggedInWithNewProvider(userAuth.uid);

    if (isUserLoggedInWithNewProvider) {
      const newProviderId = userAuth.providerData[0].providerId; // this is lastest new provider
      await auth.currentUser.unlink(newProviderId); // we delete new provider account to prevent conflict with signin methods
      await auth.signOut(); // signout user after unlink so we can use old account
      throw new Error("this email is already in use");
    }
  } catch (error) {
    console.log(error);
  }

  // find that useauth is registered or not
  const userSnapshot = await usersRef.doc(userAuth.uid).get();
  // we will return if user is already exist

  if (userSnapshot.exists) {
    const foundUser = await userSnapshot.data();
    const userId = userSnapshot.id;
    // check that user email is changed or not
    if (userAuth.email !== foundUser.email) {
      await updateUserEmail(userId, userAuth.email);
    }
    if (userAuth.phoneNumber !== foundUser.phoneNumber) {
      await updateUserPhoneNumber(userId, userAuth.phoneNumber);
    }
    // check that user email is verified or not
    if (userAuth.emailVerified !== foundUser.emailVerified) {
      await updateUserEmailVerified(userId, userAuth.emailVerified);
    }
    return { id: userId, ...foundUser };
  }

  // otherwise we will create user
  const newUserDoc = usersRef.doc(userAuth.uid);
  const newUser = {
    name: userAuth.displayName,
    email: userAuth.email,
    phoneNumber: userAuth.phoneNumber,
    emailVerified: userAuth.emailVerified,
    provider: userAuth.providerData[0].providerId,
  };

  try {
    await newUserDoc.set({
      ...newUser,
      role: "viewer",
      createdAt: Date.now(),
      disabled: false,
    });
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const checkUserLoggedInWithNewProvider = async (uid) => {
  const userAuth = auth.currentUser;
  if (userAuth.providerData.length < 2) return false;

  const userSnapshot = await usersRef.doc(uid).get();
  const userProvider = userSnapshot.data().provider;
  const newProvider = userAuth.providerData[0].providerId;

  if (userProvider !== newProvider) return true; // here user logged in with new provider

  return false;
};

// update user role by admin
export const updateUserRole = async (userId, newRole) => {
  const userRef = usersRef.doc(userId);

  try {
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      throw new Error("user not found");
    }
    await userRef.update({ role: newRole });
  } catch (error) {
    console.log(error);
  }
};
// update userauth name
export const updateUserAuthNameAndProfile = async (userId, newName) => {
  const userRef = usersRef.doc(userId);
  try {
    // update data of auth
    await auth.currentUser.updateProfile({ displayName: newName });
    // update doc of firestore
    await userRef.update({ name: newName });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserEmail = async (userId, newEmail) => {
  const userRef = usersRef.doc(userId);
  try {
    await userRef.update({ email: newEmail });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserEmailVerified = async (userId, emailVerified) => {
  const userRef = usersRef.doc(userId);
  try {
    await userRef.update({ emailVerified: emailVerified });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserAccount = async (uid) => {
  if (!uid) return;
  const userRef = usersRef.doc(uid);
  try {
    await userRef.delete();
  } catch (error) {
    console.log(error);
  }
};

const removeItemFromUser = async (userId, itemId, keyName) => {
  const userRef = usersRef.doc(userId);
  try {
    await userRef.update({
      [keyName]: firebase.firestore.FieldValue.arrayRemove(itemId),
    });
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};
const addItemToUser = async (userId, itemId, keyName) => {
  const userRef = usersRef.doc(userId);
  try {
    await userRef.update({
      [keyName]: firebase.firestore.FieldValue.arrayUnion(itemId),
    });
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};

export const addItemToUserWishlist = (userId, itemId) => {
  return addItemToUser(userId, itemId, "wishlist");
};

export const removeItemFromUserWishlist = (userId, itemId) => {
  return removeItemFromUser(userId, itemId, "wishlist");
};
export const addItemToUserBag = (userId, itemId) => {
  return addItemToUser(userId, itemId, "bag");
};

export const deleteItemFromUserBag = (userId, itemId) => {
  return removeItemFromUser(userId, itemId, "bag");
};

// not checked
export const addOrderToUser = (userId, orderId) => {
  return addItemToUser(userId, orderId, "orders");
};

// not checked
export const removeOrderFromUser = (userId, orderId) => {
  return removeItemFromUser(userId, orderId, "orders");
};

const getUsersFromDocs = (docs) =>
  docs.reduce((acc, currentDoc) => {
    return { ...acc, [currentDoc.id]: currentDoc.data() };
  }, {});

const getUsersByQuery = async (query, USERS_LIMIT = 0) => {
  try {
    const querySnapshot = await query.get();
    const users = getUsersFromDocs(querySnapshot.docs);
    return {
      users,
      firstUserDoc:
        querySnapshot.docs.length === 0 ? undefined : querySnapshot.docs[0],
      lastUserDoc:
        querySnapshot.docs.length === USERS_LIMIT
          ? querySnapshot.docs[querySnapshot.docs.length - 1]
          : undefined,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getUsersForAdmin = () => {
  const USERS_LIMIT = 15;
  const query = usersRef.orderBy("createdAt", "desc").limit(USERS_LIMIT);
  return getUsersByQuery(query, USERS_LIMIT);
};

export const getNextUsersForAdmin = (lastUserDoc) => {
  const USERS_LIMIT = 15;

  const query = usersRef
    .orderBy("createdAt", "desc")
    .startAfter(lastUserDoc)
    .limit(USERS_LIMIT);
  return getUsersByQuery(query, USERS_LIMIT);
};

export const getPrevUsersForAdmin = (firstUserDoc) => {
  const USERS_LIMIT = 15;

  const query = usersRef
    .orderBy("createdAt", "desc")
    .endBefore(firstUserDoc)
    .limitToLast(USERS_LIMIT);

  return getUsersByQuery(query, USERS_LIMIT);
};

export const getUsersFromSearchQueryAdmin = async (searchQueryText) => {
  const query = usersRef.where("email", "==", searchQueryText);

  let brands = await getUsersByQuery(query);
  brands.firstUserDoc = undefined;
  brands.lastUserDoc = undefined;
  return brands;
};

export const updateUserAddress = async (userId, address) => {
  const userRef = usersRef.doc(userId);
  try {
    await userRef.update({ address });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPhoneNumber = async (userId, phoneNumber) => {
  const userRef = usersRef.doc(userId);
  try {
    await userRef.update({ phoneNumber });
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};

export const addUserFromAdmin = async (user) => {
  const { uid, ...otherUserData } = user;
  const userDoc = usersRef.doc(uid);
  try {
    const userData = {
      ...otherUserData,
      createdAt: Date.now(),
      role: "viewer",
    };
    await userDoc.set(userData);
    return { id: uid, ...userData };
  } catch (error) {
    console.log(error);
  }
};

export const disableUserAccount = async (uid) => {
  const userDoc = usersRef.doc(uid);
  try {
    await userDoc.update({ disabled: true });
  } catch (error) {
    console.log(error);
  }
};
export const enableUserAccount = async (uid) => {
  const userDoc = usersRef.doc(uid);
  try {
    await userDoc.update({ disabled: false });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDoc = async (uid, dataToUpdate) => {
  const userDoc = usersRef.doc(uid);
  try {
    await userDoc.update({ ...dataToUpdate });
  } catch (error) {
    console.log(error);
  }
};
