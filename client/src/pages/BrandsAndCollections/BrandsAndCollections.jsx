import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
// styles
import * as S from "./BrandsAndCollections.styles";
// components
import CollectionList from "components/CollectionList/CollectionList";
import CustomButton from "components/CustomButton/CustomButton";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import NotFoundText from "components/NotFoundText/NotFoundText";
// utils
import { getBrandsByLimits, getNextBrands } from "firebase/brands.utils";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  addCollections,
  setCollections,
  setLastCollectionDoc,
} from "redux/collections/collections.actions";
import {
  addBrands,
  setBrands,
  setLastBrandDoc,
} from "redux/brands/brands.actions";

import {
  selectBrandsIds,
  selectLastBrandDoc,
} from "redux/brands/brands.selectors";
import {
  selectCollectionsIds,
  selectLastCollectionDoc,
} from "redux/collections/collections.selectors";
// utils
import { getHomeItemsCount, scrollWindowToTop } from "utils/app.utils";
import {
  getCollectionsByLimit,
  getNextCollections,
} from "firebase/collections.utils";
import { showNotification } from "redux/notification/notification.actions";

// static data
const data = {
  brands: {
    heading: "biggest deals on top brands",
  },
  collections: {
    heading: "top collections",
  },
};

function BrandsAndCollections({
  match,
  brandsIds,
  lastBrandDoc,
  setBrands,
  addBrands,
  setLastBrandDoc,
  collectionsIds,
  lastCollectionDoc,
  setCollections,
  setLastCollectionDoc,
  addCollections,
  showNotification,
}) {
  const currentListName = match.params.listName;
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextData, setHasNextData] = useState(
    currentListName === "brands" ? !!lastBrandDoc : !!lastCollectionDoc
  );
  const brandsLimit = getHomeItemsCount("brand");
  const collectionsLimit = getHomeItemsCount("collection");
  const [currentLoadingText, setCurrentLoadingText] = useState(
    `Getting ${currentListName}`
  );

  const initBrands = async () => {
    try {
      const [brandsData, error] = await getBrandsByLimits(brandsLimit);
      if (error) throw new Error(error);
      setBrands(brandsData.brands);
      setLastBrandDoc(brandsData.lastBrandDoc);
      setHasNextData(!!brandsData.lastBrandDoc);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const initCollections = async () => {
    try {
      const [collectionsData, error] = await getCollectionsByLimit(
        collectionsLimit
      );
      if (error) throw new Error(error);
      setCollections(collectionsData.collections);
      setLastCollectionDoc(collectionsData.lastCollectionDoc);
      setHasNextData(!!collectionsData.lastCollectionDoc);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  useEffect(() => {
    scrollWindowToTop();
    if (brandsIds.length === 0 || collectionsIds.length === 0) {
      const fetchItems = async () => {
        setIsLoading(true);
        try {
          if (currentListName === "brands") await initBrands();
          if (currentListName === "collections") await initCollections();
          setIsLoading(false);
        } catch (error) {
          showNotification(error.message, "error");
          setIsLoading(false);
        }
      };
      fetchItems();
    }
  }, []);

  const loadNextBrands = async () => {
    try {
      const [brandsData, error] = await getNextBrands(
        brandsLimit,
        lastBrandDoc
      );
      if (error) throw new Error(error);
      addBrands(brandsData.brands);
      setLastBrandDoc(brandsData.lastBrandDoc);
      setHasNextData(!!brandsData.lastBrandDoc);
      return [true, null];
    } catch (error) {
      return [null, error];
    }
  };

  const loadNextCollections = async () => {
    try {
      const [collectionsData, error] = await getNextCollections(
        collectionsLimit,
        lastCollectionDoc
      );
      if (error) throw new Error(error);
      addCollections(collectionsData.collections);
      setLastCollectionDoc(collectionsData.lastCollectionDoc);
      setHasNextData(!!collectionsData.lastCollectionDoc);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const loadMoreHandler = async () => {
    if (!currentLoadingText.includes("more"))
      setCurrentLoadingText(`Getting more ${currentListName}`);

    setIsLoading(true);
    try {
      if (currentListName === "brands") {
        const [, error] = await loadNextBrands();
        if (error) throw error;
      }
      if (currentListName === "collections") await loadNextCollections();
      setIsLoading(false);
    } catch (error) {
      showNotification(error.message, "error");
      setIsLoading(false);
    }
  };

  return (
    <S.BrandsAndCollectionsContainer>
      {(currentListName === "brands" && brandsIds.length > 0) ||
      (currentListName === "collections" && collectionsIds.length > 0) ? (
        <CollectionList
          heading={data[currentListName].heading}
          isBrandList={currentListName === "brands"}
          isCollectionList={currentListName === "collections"}
        />
      ) : (
        !isLoading && (
          <NotFoundText goBackUrl="/" placeCenter>
            {currentListName} not found :(
          </NotFoundText>
        )
      )}
      {isLoading ? (
        <S.BrandsAndCollectionsLoadingSpinnerContainer>
          <LoadingSpinner
            placeCenter
            hasLoadingText
            displayText={currentLoadingText}
          />
        </S.BrandsAndCollectionsLoadingSpinnerContainer>
      ) : (
        hasNextData && (
          <CustomButton
            align="center"
            color="black"
            size="small"
            onClick={loadMoreHandler}
          >
            load more
          </CustomButton>
        )
      )}
    </S.BrandsAndCollectionsContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  brandsIds: selectBrandsIds,
  collectionsIds: selectCollectionsIds,
  lastBrandDoc: selectLastBrandDoc,
  lastCollectionDoc: selectLastCollectionDoc,
});

const mapDispatchToProps = (dispatch) => ({
  addBrands: (brandsMap) => dispatch(addBrands(brandsMap)),
  setLastBrandDoc: (lastBrandDoc) => dispatch(setLastBrandDoc(lastBrandDoc)),
  setBrands: (brands) => dispatch(setBrands(brands)),
  addCollections: (collections) => dispatch(addCollections(collections)),
  setCollections: (collections) => dispatch(setCollections(collections)),
  setLastCollectionDoc: (lastCollectionDoc) =>
    dispatch(setLastCollectionDoc(lastCollectionDoc)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BrandsAndCollections));
