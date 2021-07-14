import firebase, { db } from "./firebase.utils";
import { deleteItemWithImages } from "./items.utils";
const COLLECTION_ADMIN_LIMIT = 10;

const collectionsRef = db.collection("collections");

export const createCollection = async (name, discountRate, image) => {
  const collectionData = {
    name: name.toLowerCase(),
    discountRate,
    image,
    createdAt: Date.now(),
  };
  try {
    const snapshot = await collectionsRef.add(collectionData);
    return [{ [snapshot.id]: { ...collectionData } }, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateCollection = async (collectionId, dataToUpdate) => {
  const collectionDoc = collectionsRef.doc(collectionId);
  try {
    await collectionDoc.update(dataToUpdate);
    return [true, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const deleteCollection = async (
  collectionId,
  setCurrentProgressStatus
) => {
  const collectionRef = collectionsRef.doc(collectionId);
  try {
    setCurrentProgressStatus("Getting details");
    const snapshot = await collectionRef.get();
    // get items from snapshot
    const { items } = snapshot.data();
    // merge all group items into one arr
    const allCollectionsItems =
      items &&
      Object.keys(items).reduce(
        (allItems, currentGroup) => [...allItems, ...items[currentGroup]],
        []
      );
    if (allCollectionsItems && allCollectionsItems.length > 0) {
      let counter = 1;
      for (const itemId of allCollectionsItems) {
        setCurrentProgressStatus(`deleting item ${counter}`);
        const [, error] = await deleteItemWithImages(itemId);
        if (error) throw new Error(error);
        counter++;
      }
    }
    setCurrentProgressStatus("Deleting collection");
    await collectionRef.delete();
    return [true, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const getCollectionsOptions = async () => {
  try {
    const snapshot = await collectionsRef.get();
    return [
      snapshot.docs.map((doc) => {
        const { name, discountRate } = doc.data();
        return { id: doc.id, name, discountRate };
      }),
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const getCollectionItemsCount = async (collectionId) => {
  try {
    //  get all items snapshot which has give collections
    const queryRef = db
      .collection("items")
      .where("collection", "==", collectionId);
    // get snapshot
    const querySnapshot = await queryRef.get();
    // return no of items
    return [querySnapshot.docs.length, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const getCollectionForItem = async (collectionId) => {
  const collectionRef = collectionsRef.doc(collectionId);
  try {
    const collectionSnapshot = await collectionRef.get();
    const { name, discountRate } = collectionSnapshot.data();
    return [
      {
        id: collectionSnapshot.id,
        discountRate: parseInt(discountRate),
        name,
      },
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const getCollectionsForFilter = async () => {
  try {
    const collectionsSnapshot = await collectionsRef.get();
    const collections = collectionsSnapshot.docs.map((collection) => {
      const { name, items } = collection.data();
      return {
        name,
        id: collection.id,
        groups:
          (items &&
            Object.keys(items).filter(
              (groupName) => items[groupName].length > 0
            )) ||
          [],
      };
    });
    return [collections, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

const getCollectionsByQuery = async (query, COLLECTIONS_LIMIT = 0) => {
  try {
    const querySnapshot = await query.get();

    return [
      {
        collections: querySnapshot.docs.reduce(
          (docs, currDoc) => ({ ...docs, [currDoc.id]: { ...currDoc.data() } }),
          {}
        ),
        lastCollectionDoc:
          querySnapshot.docs.length === COLLECTIONS_LIMIT
            ? querySnapshot.docs[querySnapshot.docs.length - 1]
            : undefined,
      },
      null,
    ];
  } catch (error) {
    return [null, error];
  }
};

export const getNextCollectionQueryByLimit = (limit, lastCollectionDoc) =>
  collectionsRef
    .orderBy("createdAt", "desc")
    .startAfter(lastCollectionDoc)
    .limit(limit);

export const getCollectionsQueryByLimit = (limit) =>
  collectionsRef.orderBy("createdAt", "desc").limit(limit);

export const getCollectionsForAdmin = () =>
  getCollectionsByQuery(
    getCollectionsQueryByLimit(COLLECTION_ADMIN_LIMIT),
    COLLECTION_ADMIN_LIMIT
  );

export const getNextCollectionsForAdmin = (lastCollectionDoc) =>
  getCollectionsByQuery(
    getNextCollectionQueryByLimit(COLLECTION_ADMIN_LIMIT, lastCollectionDoc),
    COLLECTION_ADMIN_LIMIT
  );

export const getCollectionsByLimit = (limit) =>
  getCollectionsByQuery(getCollectionsQueryByLimit(limit), limit);

export const getNextCollections = (limit, lastCollectionDoc) => {
  return getCollectionsByQuery(
    getNextCollectionQueryByLimit(limit, lastCollectionDoc),
    limit
  );
};

export const getCollectionsFromSearchQueryAdmin = async (searchQueryText) => {
  try {
    const query = collectionsRef.where("name", "==", searchQueryText);
    let [foundCollection, error] = await getCollectionsByQuery(query);
    if (error) throw new Error(error);
    foundCollection.lastCollectiondDoc = undefined;
    return [foundCollection, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const getCollectionsListForNavbar = async (list) => {
  const collectionsRef = db.collection("collections");
  try {
    await Promise.all(
      list.map(async (listItem, idx) => {
        const querySnapshot = await collectionsRef
          .where(`items.${listItem.name}`, "!=", [])
          .get();
        list[idx].menu = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          id: doc.id,
        }));
      })
    );
    return [list, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const addItemToCollection = async (collectionId, itemId, groupName) => {
  const collectionRef = collectionsRef.doc(collectionId);
  try {
    await collectionRef.update({
      [`items.${groupName}`]: firebase.firestore.FieldValue.arrayUnion(itemId),
    });
    return [true, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const deleteItemFromCollection = async (
  collectionId,
  itemId,
  groupName
) => {
  const collectionRef = collectionsRef.doc(collectionId);
  try {
    await collectionRef.update({
      [`items.${groupName}`]: firebase.firestore.FieldValue.arrayRemove(itemId),
    });
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};
