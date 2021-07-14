import { db } from "./firebase.utils";
const contactUsRef = db.collection("contactUs");
const ADMIN_CONTACT_US_DOCS_LIMIT = 10;

export const addContactUsDetails = async (
  name,
  email,
  problemOption,
  probleDescription
) => {
  const contactUsDetails = {
    senderName: name,
    senderEmail: email,
    problemOption,
    probleDescription,
    isReplied: false,
    createdAt: Date.now(),
  };
  try {
    const contactUsDocRef = await contactUsRef.add(contactUsDetails);
    return [{ id: contactUsDocRef.id, ...contactUsDetails }, null];
  } catch (error) {
    return [null, error];
  }
};

const getContactUsItemsByQuery = async (query) => {
  try {
    const querySnapshot = await query.get();

    return [
      {
        contactUsItems: querySnapshot.docs.reduce(
          (allDocs, doc) => ({ ...allDocs, [doc.id]: doc.data() }),
          {}
        ),
        lastDoc:
          querySnapshot.docs.length < ADMIN_CONTACT_US_DOCS_LIMIT
            ? undefined
            : querySnapshot.docs[querySnapshot.docs.length - 1],
      },
      null,
    ];
  } catch (error) {
    return [null, error];
  }
};

export const getContactUsDetails = (lastDoc) => {
  let query = contactUsRef
    .orderBy("createdAt", "desc")
    .limit(ADMIN_CONTACT_US_DOCS_LIMIT);
  if (lastDoc) query = query.startAfter(lastDoc);
  return getContactUsItemsByQuery(query);
};

export const updateContactUsDetails = async (contactUsId, dataToUpdate) => {
  const contactUsDocRef = contactUsRef.doc(contactUsId);
  try {
    await contactUsDocRef.update(dataToUpdate);
    return [{ id: contactUsId, ...dataToUpdate }, null];
  } catch (error) {
    return [null, error];
  }
};
