import { db } from "./firebase.utils";
import { deleteAllItemImages } from "admin/admin.utils";
import {
  getBrandForItem,
  addItemToBrand,
  deleteItemFromBrand,
} from "./brands.utils";
import {
  getCollectionForItem,
  addItemToCollection,
  deleteItemFromCollection,
} from "./collections.utils";
const ADMIN_ITEMS_LIMIT = 10;

const itemsRef = db.collection("items");

const getSortedImagesObj = (imagesObj) =>
  Object.keys(imagesObj)
    .sort()
    .reduce(
      (images, currImage) => ({
        ...images,
        [currImage]: imagesObj[currImage],
      }),
      {}
    );

export const addNewItem = async (
  name,
  price,
  discountRate,
  quantity,
  group,
  brand,
  collection,
  description
) => {
  const newItem = {
    name,
    price,
    discountRate,
    quantity,
    group,
    brand,
    description,
    collection,
    createdAt: Date.now(),
  };
  try {
    const newItemSnapshot = await itemsRef.add(newItem);
    return [
      {
        id: newItemSnapshot.id,
        ...newItem,
      },
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const addImagesToItem = async (itemId, itemImages) => {
  const itemDoc = itemsRef.doc(itemId);
  const images = itemImages;

  try {
    await itemDoc.update({ images });
    return [true, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const getItems = async () => {
  try {
    const snapshot = await itemsRef.orderBy("createdAt", "desc").get();

    const allItems = {};
    for (let doc of snapshot.docs) {
      const { images: imagesObj, brand, collection, ...otherData } = doc.data();
      let brandInfo, collectionInfo, error;
      if (!imagesObj) continue;

      [brandInfo, error] = await getBrandForItem(brand);
      if (error) throw new Error(error);
      [collectionInfo, error] = await getCollectionForItem(collection);
      if (error) throw new Error(error);
      const images = getSortedImagesObj(imagesObj);
      allItems[doc.id] = {
        ...otherData,
        images,
        brand: brandInfo,
        collection: collectionInfo,
      };
    }
    return allItems;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (itemId, collectionId, brandId, groupName) => {
  const itemDoc = itemsRef.doc(itemId);
  try {
    let error;

    [, error] = await deleteItemFromCollection(collectionId, itemId, groupName); // delete item from collection
    if (error) throw new Error(error);

    [, error] = await deleteItemFromBrand(brandId, itemId, groupName); // delete item from brands
    if (error) throw new Error(error);

    await itemDoc.delete(); // delete item from items
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};

const chanegItemGroup = async (
  itemId,
  newGroup,
  oldGroup,
  oldCollectionId,
  oldBrandId,
  newCollectionId,
  newBrandId
) => {
  try {
    let error;
    // if group is same then only group or collecction is changed
    if (newGroup === oldGroup) {
      // if  collection is changed then remove from  old and add to new
      if (oldCollectionId !== newCollectionId) {
        [, error] = await deleteItemFromCollection(
          oldCollectionId,
          itemId,
          oldGroup
        );
        if (error) throw new Error(error);
        [, error] = await addItemToCollection(
          newCollectionId,
          itemId,
          newGroup
        );
        if (error) throw new Error(error);
      }
      // if  brand ischanged then remove from  old and add to new
      if (oldBrandId !== newBrandId) {
        [, error] = await deleteItemFromBrand(oldBrandId, itemId, oldGroup);
        if (error) throw new Error(error);
        [, error] = await addItemToBrand(newBrandId, itemId, newGroup);
        if (error) throw new Error(Error);
      }
    } else {
      [, error] = await deleteItemFromBrand(oldBrandId, itemId, oldGroup);
      if (error) throw new Error(error);

      [, error] = await deleteItemFromCollection(
        oldCollectionId,
        itemId,
        oldGroup
      );
      if (error) throw new Error(error);

      [, error] = await addItemToCollection(newCollectionId, itemId, newGroup);
      if (error) throw new Error(error);
      [, error] = await addItemToBrand(newBrandId, itemId, newGroup);
      if (error) throw new Error(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateItemImage = async (itemId, images, newImage, oldImage) => {
  const itemRef = itemsRef.doc(itemId);
  const allImages = { ...images, [newImage.publicId]: newImage.src };
  const filteredImages = Object.keys(allImages).filter(
    (publicId) => publicId !== oldImage.publicId
  );

  const newImages = filteredImages.reduce(
    (images, currImageId) => ({
      ...images,
      [currImageId]: allImages[currImageId],
    }),
    {}
  );
  try {
    await itemRef.update({
      images: newImages,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (itemId, dataToUpdate, oldData) => {
  const itemRef = itemsRef.doc(itemId);
  const isGroupUpdated = dataToUpdate.hasOwnProperty("group");
  const isBrandUpdated = dataToUpdate.hasOwnProperty("brand");
  const isCollectionUpdated = dataToUpdate.hasOwnProperty("collection");

  try {
    if (isGroupUpdated || isBrandUpdated || isCollectionUpdated) {
      let oldGroup = oldData.group;
      let newGroup = oldGroup;
      let oldBrandId = oldData.brand;
      let oldCollectionId = oldData.collection;
      let newBrandId = oldBrandId;
      let newCollectionId = oldCollectionId;

      if (isGroupUpdated) {
        newGroup = dataToUpdate.group;
      }

      if (isBrandUpdated) {
        newBrandId = dataToUpdate.brand;
      }
      if (isCollectionUpdated) {
        newCollectionId = dataToUpdate.collection;
      }

      await chanegItemGroup(
        itemId,
        newGroup,
        oldGroup,
        oldCollectionId,
        oldBrandId,
        newCollectionId,
        newBrandId
      );
    }
    await itemRef.update({
      ...dataToUpdate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemImage = async (itemId, images, imagePublicId) => {
  const itemRef = itemsRef.doc(itemId);
  const newImagesKeys = Object.keys(images).filter(
    (imageId) => imageId !== imagePublicId
  );
  const newImages = newImagesKeys.reduce(
    (allImages, currImageId) => ({
      ...allImages,
      [currImageId]: images[currImageId],
    }),
    {}
  );

  try {
    await itemRef.update({
      images: newImages,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addItemImage = async (itemId, images, newImage) => {
  const itemRef = itemsRef.doc(itemId);
  const newImages = { ...images, [newImage.publicId]: newImage.src };

  try {
    await itemRef.update({
      images: newImages,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getItemFromId = async (itemId) => {
  const itemRef = itemsRef.doc(itemId);
  try {
    const itemSnapshot = await itemRef.get();
    if (itemSnapshot.exists) {
      const founditem = itemSnapshot.data();
      let error, foundBrand, foundCollection;
      founditem.images = getSortedImagesObj(founditem.images);

      [foundBrand, error] = await getBrandForItem(founditem.brand);
      if (error) throw new Error(error);
      founditem.brand = foundBrand;

      [foundCollection, error] = await getCollectionForItem(
        founditem.collection
      );
      if (error) throw new Error(error);
      founditem.collection = foundCollection;

      return [
        {
          id: itemSnapshot.id,
          ...founditem,
        },
        null,
      ];
    } else {
      return [undefined, null];
    }
  } catch (error) {
    return [null, error];
  }
};

export const deleteItemWithImages = async (itemId) => {
  try {
    let error;
    // item ref
    const itemRef = db.collection("items").doc(itemId);
    const itemSnapshot = await itemRef.get();
    //  get brand data collection and group
    const {
      brand: brandId,
      collection: collectionId,
      group: groupName,
    } = itemSnapshot.data();
    // delete item from brand
    [, error] = await deleteItemFromBrand(brandId, itemId, groupName);
    if (error) throw new Error(error);
    // delete item from collection
    [, error] = await deleteItemFromCollection(collectionId, itemId, groupName);
    if (error) throw new Error(error);
    // delete all images of items
    [, error] = await deleteAllItemImages(itemId);
    if (error) throw new Error(error);
    // delete item
    await itemRef.delete();
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};
const getItemsFromDocs = async (docs) => {
  try {
    const items = {};

    if (docs.length > 0) {
      for (let doc of docs) {
        const { images, collection, brand, ...otherData } = doc.data();
        let foundBrand, foundCollection, error;

        [foundBrand, error] = await getBrandForItem(brand);
        if (error) throw new Error(error);

        [foundCollection, error] = await getCollectionForItem(collection);
        if (error) throw new Error(error);

        items[doc.id] = {
          ...otherData,
          images: getSortedImagesObj(images || {}),
          brand: foundBrand,
          collection: foundCollection,
        };
      }
    }

    return [items, undefined];
  } catch (error) {
    return [undefined, error];
  }
};
const getItemsByQuery = async (query, ITEMS_LIMIT = 0) => {
  try {
    const querySnapshot = await query.get();
    const [items, error] = await getItemsFromDocs(querySnapshot.docs);
    if (error) throw new Error(error);

    return [
      {
        items,
        lastItemDoc:
          querySnapshot.docs.length === ITEMS_LIMIT
            ? querySnapshot.docs[querySnapshot.docs.length - 1]
            : undefined,
      },
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const getItemsForAdmin = () => {
  const query = itemsRef.orderBy("createdAt", "desc").limit(ADMIN_ITEMS_LIMIT);
  return getItemsByQuery(query, ADMIN_ITEMS_LIMIT);
};

export const getNextItemsForAdmin = (lastItemDoc) => {
  const query = itemsRef
    .orderBy("createdAt", "desc")
    .startAfter(lastItemDoc)
    .limit(ADMIN_ITEMS_LIMIT);

  return getItemsByQuery(query, ADMIN_ITEMS_LIMIT);
};

export const getMinAndMaxDiscountOfItemsByGroup = async (groupName) => {
  const groupForQuery = groupName === "kids" ? ["girls", "boys"] : groupName;

  try {
    const maxDiscountSnapshot = await db
      .collection("items")
      .where("group", "in", groupForQuery)
      .orderBy("discountRate", "desc")
      .limit(1)
      .get();

    const minDiscountSnapshot = await db
      .collection("items")
      .where("group", "in", groupForQuery)
      .orderBy("discountRate")
      .limit(1)
      .get();

    const maxDiscount =
      (maxDiscountSnapshot.docs[0] &&
        maxDiscountSnapshot.docs[0].data().discountRate) ||
      0;
    const minDiscount =
      (minDiscountSnapshot.docs[0] &&
        minDiscountSnapshot.docs[0].data().discountRate) ||
      0;

    return [{ maxDiscount, minDiscount }, null];
  } catch (error) {
    return [null, error];
  }
};

export const getAllItemsDocs = async () => {
  try {
    const snapshot = await itemsRef.orderBy("createdAt", "desc").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.log(error);
  }
};

export const getFullItemFromItemData = async (doc) => {
  const item = { id: doc.id, ...doc.data() };

  try {
    let foundBrand, foundCollection, error;
    [foundBrand, error] = await getBrandForItem(item.brand);
    if (error) throw new Error(error);

    [foundCollection, error] = await getCollectionForItem(item.collection);
    if (error) throw new Error(error);

    item.images = getSortedImagesObj(item.images);
    item.brand = foundBrand;
    item.collection = foundCollection;

    return item;
  } catch (error) {
    console.log(error);
  }
};

export const getItemsDocsWithDataForFilter = async (
  currentFilter,
  itemsLimit,
  lastDoc
) => {
  const { group, brands, collections } = currentFilter;

  let groupQuery = itemsRef.orderBy("createdAt", "desc");

  if (lastDoc) {
    groupQuery = groupQuery.startAfter(lastDoc);
  }

  groupQuery = groupQuery.limit(itemsLimit);

  if (group !== "all") {
    groupQuery = groupQuery.where("group", "==", group);
  }

  if (brands.length > 0 && collections.length === 0) {
    groupQuery = groupQuery.where("brand", "in", brands);
  }
  if (collections.length > 0 && brands.length === 0)
    groupQuery = groupQuery.where("collection", "in", collections);

  try {
    const querySnapshot = await groupQuery.get();
    return querySnapshot.docs;
  } catch (error) {
    console.log(error);
  }
};

export const getItemsDocsWithFilterGroupAndCollection = async (
  currentFilter
) => {
  const { group, brands, collections } = currentFilter;

  let query = itemsRef
    .orderBy("createdAt", "desc")
    .where("brand", "in", brands);

  if (group !== "all") {
    query = query.where("group", "==", group);
  }
  let itemsDocs = [];

  for (let collection of collections) {
    let itemSnapshot = await query.where("collection", "==", collection).get();
    itemsDocs = [...itemSnapshot.docs, ...itemsDocs];
  }

  return itemsDocs;
};

export const addItemQty = async (itemId, size, qty) => {
  const itemRef = itemsRef.doc(itemId);
  try {
    const itemSnapshot = await itemRef.get();
    const { quantity } = itemSnapshot.data();
    quantity[size] += qty;
    await itemRef.update({
      quantity,
    });
  } catch (error) {
    console.log(error);
  }
};
export const reduceItemQuantity = async (itemId, size, qty) => {
  const itemRef = itemsRef.doc(itemId);

  try {
    const itemSnapshot = await itemRef.get();
    const { quantity } = itemSnapshot.data();
    quantity[size] = quantity[size] - qty;
    await itemRef.update({
      quantity,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFirstImageOfItemById = async (itemId) => {
  const itemRef = itemsRef.doc(itemId);
  try {
    const itemSnapshot = await itemRef.get();
    const { images } = itemSnapshot.data();

    return [
      images[
        Object.keys(images).filter((imageId) => imageId.endsWith("/1"))[0]
      ],
      null,
    ];
  } catch (error) {
    return [null, error];
  }
};
