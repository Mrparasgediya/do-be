import React, { useEffect, Fragment } from "react";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setBrands,
  setLastBrandDoc,
  toggleIsHomeBrandsLoading,
} from "redux/brands/brands.actions";
import {
  setNewsletter,
  setBrandVideo,
  toggleIsHomeBrandVideoLoading,
} from "redux/static/static.actions";
import {
  setCollections,
  toggleIsHomeCollectionsLoading,
} from "redux/collections/collections.actions";
import { selectBrandsIds } from "redux/brands/brands.selectors";
import { selectCollectionsIds } from "redux/collections/collections.selectors";
import {
  selectNewsletter,
  selectBrandVideo,
} from "redux/static/static.selectors";
import { setLastCollectionDoc } from "redux/admin/collections/collections.actions";
// components
import CollectionList from "components/CollectionList/CollectionList";
import Newsletter from "components/Newsletter/Newsletter";
import BrandVideo from "components/BrandVideo/BrandVideo";
import HomeSlider from "components/HomeSlider/HomeSlider";
// utils
import { getBrandsByLimits } from "firebase/brands.utils";
import { getBrandVideo } from "firebase/brandVideo.utils";
import { getCollectionsByLimit } from "firebase/collections.utils.js";
import { getHomeItemsCount, scrollWindowToTop } from "utils/app.utils";
import { getNewsletterImage } from "firebase/newsletter.utils";
import { showNotification } from "redux/notification/notification.actions";

const Home = ({
  brandsIds,
  collectionsIds,
  newletterImage,
  brandVideo,
  setBrands,
  setNewsletter,
  setCollections,
  setBrandVideo,
  setLastBrandDoc,
  setLastCollectionDoc,
  toggleIsHomeBrandsLoading,
  toggleIsHomeCollectionsLoading,
  toggleIsHomeBrandVideoLoading,
  showNotification,
}) => {
  const brandsItemsCount = getHomeItemsCount("brand");
  const collectionItemsCount = getHomeItemsCount("collection");

  useEffect(() => {
    scrollWindowToTop();
  }, []);

  const loadBrands = async () => {
    if (brandsIds.length === 0) {
      try {
        toggleIsHomeBrandsLoading();
        const [fetchedBrands, error] = await getBrandsByLimits(
          brandsItemsCount
        );
        if (error) throw new Error(error);
        const { brands, lastBrandDoc } = fetchedBrands;
        setBrands(brands);
        setLastBrandDoc(lastBrandDoc);
        toggleIsHomeBrandsLoading();
      } catch (error) {
        showNotification(error.message, "error");
        toggleIsHomeBrandsLoading();
      }
    }
  };

  const loadCollections = async () => {
    if (collectionsIds.length === 0) {
      try {
        toggleIsHomeCollectionsLoading();
        const [collectionsData, error] = await getCollectionsByLimit(
          collectionItemsCount
        );
        if (error) throw new Error(error);

        const { collections, lastCollectionDoc } = collectionsData;
        setCollections(collections);
        setLastCollectionDoc(lastCollectionDoc);
        toggleIsHomeCollectionsLoading();
      } catch (error) {
        showNotification(error.message, "error");
        toggleIsHomeCollectionsLoading();
      }
    }
  };

  const loadBrandVideo = async () => {
    if (!brandVideo) {
      try {
        toggleIsHomeBrandVideoLoading();
        const brandVideo = await getBrandVideo();
        setBrandVideo(brandVideo);
        toggleIsHomeBrandVideoLoading();
      } catch (error) {
        showNotification(error.message, "error");
        toggleIsHomeBrandVideoLoading();
      }
    }
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        loadBrands();
        loadCollections();
        loadBrandVideo();
        if (!newletterImage) {
          const newsletter = await getNewsletterImage();
          if (newsletter && newsletter.image) setNewsletter(newsletter.image);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      fetchData = null;
    };
  }, []);

  return (
    <Fragment>
      <HomeSlider />
      <CollectionList
        heading={"biggest deals on top brands"}
        itemsLimit={brandsItemsCount}
        isBrandList
        isHomePageList
      />
      <BrandVideo />
      <CollectionList
        heading={"top collections"}
        isCollectionList
        itemsLimit={collectionItemsCount}
        isHomePageList
      />
      <Newsletter />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  brandVideo: selectBrandVideo,
  newletterImage: selectNewsletter,
  brandsIds: selectBrandsIds,
  collectionsIds: selectCollectionsIds,
});

const mapDispatchToProps = (dispatch) => ({
  setBrands: (brands) => dispatch(setBrands(brands)),
  setLastBrandDoc: (lastBrandDoc) => dispatch(setLastBrandDoc(lastBrandDoc)),
  toggleIsHomeBrandsLoading: () => dispatch(toggleIsHomeBrandsLoading()),
  setNewsletter: (newsletter) => dispatch(setNewsletter(newsletter)),
  setCollections: (collections) => dispatch(setCollections(collections)),
  setLastCollectionDoc: (lastCollectionDoc) =>
    dispatch(setLastCollectionDoc(lastCollectionDoc)),
  toggleIsHomeCollectionsLoading: () =>
    dispatch(toggleIsHomeCollectionsLoading()),
  setBrandVideo: (brandVideo) => dispatch(setBrandVideo(brandVideo)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  toggleIsHomeBrandVideoLoading: () =>
    dispatch(toggleIsHomeBrandVideoLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
