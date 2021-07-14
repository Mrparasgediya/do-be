import { createSelector } from "reselect";

const selectNewsletterState = (state) => state.admin.static.newsletter;

export const selectNewsletterImage = createSelector(
  [selectNewsletterState],
  (newsletter) => (newsletter.image ? newsletter.image.image : null)
);
export const selectNewsletterImageId = createSelector(
  [selectNewsletterState],
  (newsletter) => (newsletter.image ? newsletter.image.id : null)
);

export const selectAddNewsletterImageDialog = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.addNewsletterImageDialog
);

export const selectUpdateNewsletterImageDialog = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.updateNewsletterImageDialog
);
export const selectDeleteNewsletterImageDialog = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.deleteNewsletterImageDialog
);

export const selectIsOperationRunning = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.isOperationRunning
);

export const selectNewsletterEmails = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.emails
);

export const selectAddNewsletterEmailDialog = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.addNewsletterEmailDialog
);
export const selectDeleteNewsletterEmailDialog = createSelector(
  [selectNewsletterState],
  (newsletter) => newsletter.deleteNewsletterEmailDialog
);
export const selectNewsletterEmailForOperation = createSelector(
  [selectNewsletterState, selectNewsletterEmails],
  (newsletter, emails) => {
    const newsletterEmailId = newsletter.newsletterEmailForOperation;
    const newsletterEmail = emails
      ? { id: newsletterEmailId, ...emails[newsletterEmailId] }
      : undefined;
    return newsletterEmail ? newsletterEmail : null;
  }
);
