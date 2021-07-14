import newsletterActionTypes from "./newsletter.types";

const INITIAL_STATE = {
  image: null,
  addNewsletterImageDialog: false,
  updateNewsletterImageDialog: false,
  deleteNewsletterImageDialog: false,
  isOperationRunning: false,
  emails: null,
  addNewsletterEmailDialog: false,
  deleteNewsletterEmailDialog: false,
  newsletterEmailForOperation: null,
};

const newsletterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case newsletterActionTypes.SET_NEWSLETTER_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    case newsletterActionTypes.TOGGLE_ADD_NEWLETTER_IMAGE_DIALOG:
      return {
        ...state,
        addNewsletterImageDialog: !state.addNewsletterImageDialog,
      };

    case newsletterActionTypes.ADD_NEWSLETTER_IMAGE:
      return { ...state, image: action.payload };

    case newsletterActionTypes.TOGGLE_UPDATE_NEWSLETTER_IMAGE_DIALOG:
      return {
        ...state,
        updateNewsletterImageDialog: !state.updateNewsletterImageDialog,
      };

    case newsletterActionTypes.UPDATE_NEWSLETTER_IMAGE:
      return {
        ...state,
        image: {
          ...state.image,
          image: action.payload,
        },
      };

    case newsletterActionTypes.TOGGLE_DELETE_NEWLETTER_IMAGE_DIALOG:
      return {
        ...state,
        deleteNewsletterImageDialog: !state.deleteNewsletterImageDialog,
      };

    case newsletterActionTypes.DELETE_NEWSLETTER_IMAGE:
      return {
        ...state,
        image: null,
      };

    case newsletterActionTypes.TOGGLE_IS_OPERATION_RUNNING:
      return {
        ...state,
        isOperationRunning: !state.isOperationRunning,
      };

    case newsletterActionTypes.SET_NEWSLETTER_EMAILS:
      return {
        ...state,
        emails: action.payload,
      };

    case newsletterActionTypes.TOGGLE_ADD_NEWSLETTER_EMAIL_DIALOG:
      return {
        ...state,
        addNewsletterEmailDialog: !state.addNewsletterEmailDialog,
      };

    case newsletterActionTypes.ADD_NEWSLETTER_EMAIL:
      return {
        ...state,
        emails: { ...action.payload, ...state.emails },
      };

    case newsletterActionTypes.SET_NEWSLETTER_EMAIL_FOR_OPERATION:
      return {
        ...state,
        newsletterEmailForOperation: action.payload,
      };

    case newsletterActionTypes.TOGGLE_DELETE_NEWSLETTER_EAMIL_DIALOG:
      return {
        ...state,
        deleteNewsletterEmailDialog: !state.deleteNewsletterEmailDialog,
      };

    case newsletterActionTypes.DELETE_NEWSLETTER_EMAIL:
      const newEmails = state.emails;
      delete newEmails[action.payload];
      return {
        ...state,
        emails: { ...newEmails },
      };

    default:
      return state;
  }
};

export default newsletterReducer;
