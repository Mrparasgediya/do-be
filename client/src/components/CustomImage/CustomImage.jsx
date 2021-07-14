import React, { useEffect, useRef, useState } from "react";
// styles
import * as S from "./CustomImage.styles";

function CustomImage({
  type,
  src,
  alt,
  srcSet,
  placeholderSrc,
  isObservedImage,
  ...otherProps
}) {
  const imageRef = useRef();
  const [loading, setLoading] = useState(true);
  const isLoaded = useRef(false);

  const setSrcsToImage = (image) => {
    if (srcSet && imageRef.current) {
      imageRef.current.srcset = srcSet;
    }
    image.src = src;
  };

  const observeRef = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          //  here check that image is visible on screen
          if (entry.isIntersecting) {
            const image = imageRef.current;
            const loaded = isLoaded.current;
            // here we will load image from this function
            const loadImage = () => {
              setSrcsToImage(image);
              observer.unobserve(image);
            };
            //  image placeholder is not loaded and it is on screen
            if (!loaded) {
              //  change onload function to load image
              image.onload = (e) => {
                if (e.target.src === placeholderSrc) {
                  loadImage();
                }
              };
              return;
            }
            //  check image is loaded then load image
            if (loaded) {
              loadImage();
            }
          }
        });
      },
      {
        threshold: 0.25,
      }
    )
  );

  useEffect(() => {
    if (isObservedImage) {
      const observer = observeRef.current;
      const image = imageRef.current;
      observer.observe(image);
    }
  }, [isObservedImage]);

  return (
    <S.StyledCustomImageContainer type={type} isLoading={loading}>
      <S.StyledCustomImage
        type={type}
        ref={imageRef}
        src={placeholderSrc}
        alt={alt || "img"}
        onError={() => setLoading(false)}
        onLoad={(e) => {
          if (e.target.src !== placeholderSrc) return setLoading(false);
          //  check image is observed or not
          if (!isObservedImage) return setSrcsToImage(e.target);
          //  this will executed when image is not observed
          isLoaded.current = true;
        }}
        {...otherProps}
      />
    </S.StyledCustomImageContainer>
  );
}

export default CustomImage;
