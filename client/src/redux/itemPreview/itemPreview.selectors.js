import { createSelector } from "reselect";

const selectItemPreviewState = (state) => state.itemPreview;

export const selectItemForPreview = createSelector(
  [selectItemPreviewState],
  (itemPreview) => {
    const itemForPreview = itemPreview.item;
    if (itemForPreview) {
      itemForPreview.imagesIds = Object.keys(itemForPreview.images);
      itemForPreview.sizesArr = Object.keys(itemForPreview.quantity);
    }
    return itemForPreview;
  }
);

export const selectItemIsLoadingForPreview = createSelector(
  [selectItemPreviewState],
  (itemPreview) => itemPreview.isLoading
);

export const selectItemImagePreviewDialog = createSelector(
  [selectItemPreviewState],
  (itemPreview) => itemPreview.imagePreviewDialog
);

export const selectCurrentImageForImagePreviewDialog = createSelector(
  [selectItemPreviewState],
  (itemPreview) => itemPreview.currentImageForIamgePreviewDialog
);
