import newsletterActionTypes from "./newsletter.types";

export const setNewsletterImage = (newsletterImage) => ({
  type: newsletterActionTypes.SET_NEWSLETTER_IMAGE,
  payload: newsletterImage,
});

export const toggleAddNewsletterImageDialog = () => ({
  type: newsletterActionTypes.TOGGLE_ADD_NEWLETTER_IMAGE_DIALOG,
});

export const addNewsletterImage = (newsletterImage) => ({
  type: newsletterActionTypes.ADD_NEWSLETTER_IMAGE,
  payload: newsletterImage,
});

export const toggleUpdateNewsletterImageDialog = () => ({
  type: newsletterActionTypes.TOGGLE_UPDATE_NEWSLETTER_IMAGE_DIALOG,
});

export const updateNewsletterImage = (newImage) => ({
  type: newsletterActionTypes.UPDATE_NEWSLETTER_IMAGE,
  payload: newImage,
});

export const toggleDeleteNewsletterImageDialog = () => ({
  type: newsletterActionTypes.TOGGLE_DELETE_NEWLETTER_IMAGE_DIALOG,
});

export const deleteNewsletterImage = () => ({
  type: newsletterActionTypes.DELETE_NEWSLETTER_IMAGE,
});

export const toggleIsOperationRunning = () => ({
  type: newsletterActionTypes.TOGGLE_IS_OPERATION_RUNNING,
});

export const setNewsletterEmails = (emails) => ({
  type: newsletterActionTypes.SET_NEWSLETTER_EMAILS,
  payload: emails,
});

export const toggleAddNewsletterEamilDialog = () => ({
  type: newsletterActionTypes.TOGGLE_ADD_NEWSLETTER_EMAIL_DIALOG,
});

export const addNewsletterEmail = (email) => ({
  type: newsletterActionTypes.ADD_NEWSLETTER_EMAIL,
  payload: email,
});

export const toggleDeleteNewsletterEmailDialog = () => ({
  type: newsletterActionTypes.TOGGLE_DELETE_NEWSLETTER_EAMIL_DIALOG,
});

export const deleteNewsletterEmail = (emailId) => ({
  type: newsletterActionTypes.DELETE_NEWSLETTER_EMAIL,
  payload: emailId,
});

export const setNewsletterEmailForOperation = (newsletterEmailId) => ({
  type: newsletterActionTypes.SET_NEWSLETTER_EMAIL_FOR_OPERATION,
  payload: newsletterEmailId,
});
