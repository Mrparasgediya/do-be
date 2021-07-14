import React, { useState } from "react";
// styles
import * as S from "./HomeSlider.styles";
// static data
import homeSlidesData from "./homeSlidesData";
// components
import SliderData from "./SliderData/SliderData";
import CustomSlider from "components/CustomSlider/CustomSlider";
import SocialIcons from "./SocialIcons/SocialIcons";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import { getMinAndMaxDiscountOfItemsByGroup } from "firebase/items.utils";
import { showNotification } from "redux/notification/notification.actions";
import { connect } from "react-redux";

const HomeSlider = ({ showNotification }) => {
  const [slidesData, setSlidesData] = useState([]);

  React.useEffect(() => {
    const defaultSlidesData = homeSlidesData;
    const fetchItem = async () => {
      try {
        for (let slideData of defaultSlidesData) {
          const [fetchedData, error] = await getMinAndMaxDiscountOfItemsByGroup(
            slideData.group
          );
          if (error) throw new Error(error);
          const { minDiscount, maxDiscount } = fetchedData;
          if (minDiscount === maxDiscount) {
            slideData.discountRate = `${minDiscount}%`;
          } else {
            slideData.discountRate = `${minDiscount}%-${maxDiscount}%`;
          }
        }
      } catch (error) {
        showNotification(error.message, "error");
      }
      setSlidesData(defaultSlidesData);
    };

    fetchItem();
  }, []);

  return (
    <S.StyledHomeSliderContainer maxWidth={false}>
      <SocialIcons />

      <CustomSlider
        isHomePageSlider
        startSlideAt={0}
        slides={slidesData.map((data) => (
          <S.StyledHomeSliderSlide>
            <CustomImage type="homeSlideImage" {...data.image} />
            <SliderData data={data} />
          </S.StyledHomeSliderSlide>
        ))}
      />
    </S.StyledHomeSliderContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});
export default connect(null, mapDispatchToProps)(HomeSlider);
