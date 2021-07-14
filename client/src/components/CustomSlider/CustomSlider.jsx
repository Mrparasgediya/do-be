import React from "react";

// styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "./CustomSlider.scss";
// components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";
// to use swiper core features
SwiperCore.use([Autoplay, Navigation, Pagination]);

function CustomSlider({
  slides,
  isForPreviewDialog,
  isForItemPreview,
  isHomePageSlider,
}) {
  return (
    <Swiper
      id="mySwiper"
      slidesPerView={1}
      autoplay={
        isHomePageSlider && {
          delay: 2500,
          disableOnInteraction: false,
        }
      }
      pagination={{
        clickable: true,
      }}
      loop={isHomePageSlider}
      navigation={!isHomePageSlider}
      style={{
        height: isForItemPreview ? "60vh" : "auto",
        width: "100%",
      }}
      className={`${isHomePageSlider ? "swiper-home-slider" : ""} ${
        isForPreviewDialog ? "swiper-without-indicators" : ""
      }`}
      onInit={(swiper) => (swiper.activeIndex = 1)}
    >
      {slides.map((slideContent, idx) => (
        <SwiperSlide
          style={{
            height: isHomePageSlider ? "100vh" : "inherit",
            overflow: isForPreviewDialog ? "scroll" : "inherit",
          }}
          key={`slide-${idx}`}
        >
          {slideContent}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CustomSlider;
