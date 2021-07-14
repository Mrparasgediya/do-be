import React, { useState } from "react";
import { withRouter } from "react-router";
// styles
import * as S from "./BrandVideo.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectBrandVideo,
  selectIsHomeBrandVideoLoading,
} from "redux/static/static.selectors";
import { selectBrandForFilter } from "redux/filter/filter.action";

// components
import CustomButton from "../CustomButton/CustomButton";
import CustomImage from "components/CustomImage/CustomImage";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import NotFoundText from "components/NotFoundText/NotFoundText";

function BrandVideo({
  brandVideo,
  selectBrandForFilter,
  history,
  isHomeBrandVideoLoading,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  let getSrcForCurrentDevice = (src) => {
    if (!src) return;
    if (window.innerWidth < 480) return src.small.url;
    if (window.innerWidth < 768) return src.med.url;
    return src.large.url;
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <S.BrandVideoContainer>
      {brandVideo ? (
        <React.Fragment>
          <S.BrandVideoOverlay />
          <S.BrandVideo
            preload="none"
            isLoaded={isLoaded}
            autoPlay
            muted
            loop
            onLoadedData={handleVideoLoad}
            src={getSrcForCurrentDevice(brandVideo.video.src)}
          />
          <S.StyledBrandVideoCustomImage
            isLoaded={isLoaded}
            src={brandVideo.image.src.org.url}
            srcSet={getSrcForCurrentDevice(brandVideo.image.src)}
            placeholderSrc={brandVideo.image.src.xs.url}
            type="brandVideoImage"
          />
          <S.BrandVideoContentContainer>
            <S.BrandVideoContentHeading>
              {brandVideo.headingText}
            </S.BrandVideoContentHeading>
            {brandVideo.displayBrandIcon ? (
              <CustomImage
                placeholderSrc={brandVideo.brand.logo.src.xs.url}
                type="brandVideoLogo"
                src={getSrcForCurrentDevice(brandVideo.brand.logo.src)}
                alt={`${brandVideo.brand.name}-logo`}
              />
            ) : (
              <S.BrandVideoContentHeading>
                {brandVideo.brand.name}
              </S.BrandVideoContentHeading>
            )}
            <CustomButton
              align="center"
              onClick={() => {
                selectBrandForFilter(brandVideo.brand.id);
                history.push("/search");
              }}
            >
              view collection
            </CustomButton>
          </S.BrandVideoContentContainer>
        </React.Fragment>
      ) : isHomeBrandVideoLoading ? (
        <LoadingSpinner hasLoadingText displayText="Getting Brand Video" />
      ) : (
        <NotFoundText placeCenter>Brand Video Not Found :(</NotFoundText>
      )}
    </S.BrandVideoContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  brandVideo: selectBrandVideo,
  isHomeBrandVideoLoading: selectIsHomeBrandVideoLoading,
});

const mapDispatchToProps = (dispatch) => ({
  selectBrandForFilter: (brandId) => dispatch(selectBrandForFilter(brandId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BrandVideo));
