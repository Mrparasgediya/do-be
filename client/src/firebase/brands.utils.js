import { deleteItemWithImages } from "./items.utils";
import firebase, { db } from "./firebase.utils";
const ADMIN_BRANDS_LIMIT = 10;

const brandsRef = db.collection("brands");

const getBrandsFromDocs = (docs) => {
  return docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.data() }), {});
};

export const createBrand = async (brand) => {
  const brandsRef = db.collection("brands");
  const newBrand = brandsRef.doc();
  brand.name = brand.name.toLowerCase();

  try {
    const newData = { ...brand, createdAt: Date.now() };
    await newBrand.set(newData);
    return [{ [newBrand.id]: { ...newData } }, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateBrandById = async (brandId, dataToUpdate) => {
  const brandDoc = db.collection("brands").doc(brandId);

  try {
    await brandDoc.update(dataToUpdate);
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};

export const deleteBrand = async (brandId, setCurrentProgressStatus) => {
  try {
    const brandRef = brandsRef.doc(brandId);
    setCurrentProgressStatus("Getting Brand Items");
    const snapshot = await brandRef.get();
    const { items } = snapshot.data();
    // get all
    const allCollectionsItems =
      items &&
      Object.keys(items).reduce(
        (allItems, currentGroup) => [...allItems, ...items[currentGroup]],
        []
      );
    if (allCollectionsItems && allCollectionsItems.length > 0) {
      let counter = 1;
      for (const itemId of allCollectionsItems) {
        setCurrentProgressStatus(`Deleting Item ${counter}`);
        const [, error] = await deleteItemWithImages(itemId);
        if (error) throw new Error(error);
        counter++;
      }
    }
    setCurrentProgressStatus("Deleting Brand");
    await brandRef.delete();
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};

export const getBrandsOptions = async () => {
  try {
    // get brands ref
    const brandsRef = db.collection("brands");
    // get brands snapshot
    const brandsSnapshot = await brandsRef.get();
    // get brands options
    return [
      brandsSnapshot.docs.map((doc) => {
        const { name, discountRate } = doc.data();
        return {
          id: doc.id,
          name,
          discountRate,
        };
      }),
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const getBrandById = async (brandId) => {
  const brandRef = brandsRef.doc(brandId);
  try {
    const brandSnspshot = await brandRef.get();
    return [
      {
        id: brandId,
        ...brandSnspshot.data(),
      },
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const getBrandItemsCount = async (brandId) => {
  try {
    //  get all items snapshot which has give collections
    const queryRef = db.collection("items").where("brand", "==", brandId);
    // get snapshot
    const querySnapshot = await queryRef.get();
    // return no of items
    return [querySnapshot.docs.length, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

export const getBrandForItem = async (brandId) => {
  const brandRef = brandsRef.doc(brandId);
  try {
    const brandSnapshot = await brandRef.get();
    const { discountRate, name } = brandSnapshot.data();
    return [
      {
        id: brandSnapshot.id,
        discountRate: parseInt(discountRate),
        name,
      },
      undefined,
    ];
  } catch (error) {
    return [undefined, error];
  }
};

export const getBrandsForFilter = async () => {
  try {
    const querySnapshot = await brandsRef.get();

    const brands = await Promise.all(
      querySnapshot.docs.map(async (brandDoc) => {
        const { name, items } = await brandDoc.data();
        return {
          id: brandDoc.id,
          name,
          groups: items
            ? Object.keys(items).filter(
                (groupKey) => items[groupKey].length > 0
              )
            : [],
        };
      })
    );

    return [brands, undefined];
  } catch (error) {
    return [undefined, error];
  }
};

const getBrandsByQuery = async (query, BRANDS_LIMIT = 0) => {
  try {
    const querySnapshot = await query.get();
    return [
      {
        brands: getBrandsFromDocs(querySnapshot.docs),
        lastBrandDoc:
          querySnapshot.docs.length === BRANDS_LIMIT
            ? querySnapshot.docs[querySnapshot.docs.length - 1]
            : undefined,
      },
      null,
    ];
  } catch (error) {
    return [null, error];
  }
};

const getBrandsQueryByLimit = (brandsLimit) => {
  return brandsRef.orderBy("createdAt", "desc").limit(brandsLimit);
};
const getNextBrandsQueryByLimit = (limit, lastBrandDoc) => {
  return brandsRef
    .orderBy("createdAt", "desc")
    .startAfter(lastBrandDoc)
    .limit(limit);
};

export const getBrandsByLimits = (limit) => {
  return getBrandsByQuery(getBrandsQueryByLimit(limit), limit);
};

export const getNextBrands = (limit, lastBrandDoc) => {
  return getBrandsByQuery(
    getNextBrandsQueryByLimit(limit, lastBrandDoc),
    limit
  );
};

export const getBrandsForAdmin = () => getBrandsByLimits(ADMIN_BRANDS_LIMIT);
export const getNextBrandsForAdmin = (lastBrandDoc) =>
  getBrandsByQuery(getNextBrandsQueryByLimit(ADMIN_BRANDS_LIMIT, lastBrandDoc));

export const getBrandsFromSearchQueryAdmin = async (searchQueryText) => {
  const query = brandsRef.where("name", "==", searchQueryText);
  try {
    let [foundBrand, error] = await getBrandsByQuery(query);
    if (error) throw new Error(error);
    foundBrand.firstBrandDoc = undefined;
    foundBrand.lastBrandDoc = undefined;
    return [foundBrand, undefined];
  } catch (error) {
    return [null, error];
  }
};
export const addItemToBrand = async (brandId, itemId, groupName) => {
  const brandRef = brandsRef.doc(brandId);
  try {
    await brandRef.update({
      [`items.${groupName}`]: firebase.firestore.FieldValue.arrayUnion(itemId),
    });
    return [true, undefined];
  } catch (error) {
    return [undefined, error];
  }
};
export const deleteItemFromBrand = async (brandId, itemId, groupName) => {
  const brandRef = brandsRef.doc(brandId);
  try {
    await brandRef.update({
      [`items.${groupName}`]: firebase.firestore.FieldValue.arrayRemove(itemId),
    });
    return [true, null];
  } catch (error) {
    return [null, error];
  }
};
