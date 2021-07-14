import styled, { css } from "styled-components";

const signUpImageContainerStyle = css`
  height: 100%;
  width: 100%;
`;

const signInImageContainerStyle = css`
  height: 100%;
  width: 100%;
`;

const brandImageContainerStyle = css`
  position: relative;
  width: 100%;
  height: 18rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;
`;

const brandLogoImageContainerStyle = css`
  position: relative;
  max-width: 75%;
  margin: 1rem 0;
  height: 8rem;

  @media (max-width: 768px) {
    height: 5rem;
  }
`;
const collectionImageContainerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: filter 0.3s;
  height: 100%;
  width: 100%;

  @media (max-width: 768px) {
    filter: brightness(0.7);
  }
`;

const newsletterImageContainerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: pink;
`;

const brandVideoImageContainerStyle = css`
  height: 100%;
  width: 100%;
`;

const brandVideoLogoImageContainerStyle = css`
  position: relative;

  &:after {
    backdrop-filter: none;
  }
`;

const itemPreviewImageContainerStyle = css`
  position: relative;
  min-height: 50rem;
  height: 100%;
  min-width: 20vw;
  width: 100%;
  background-color: var(--color-gray-image);
  object-fit: cover;
  overflow: hidden;

  @media (min-width: 769px) {
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }

  @media (max-width: 768px) {
    cursor: auto;
  }
`;

const defaultImageContainerStyle = css`
  height: 100%;
  width: 100%;
  position: relative;
`;

const homeSlideImageContainerStyle = css`
  ${defaultImageContainerStyle}
  @media (max-width: 768px) {
    &::after {
      background-image: linear-gradient(0deg, #00000080, transparent);
    }
  }
`;

const aboutUsImageContainerStyle = css`
  ${defaultImageContainerStyle}

  &::after {
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  }
`;

const contactUsImageContainerStyle = css`
  ${defaultImageContainerStyle}
  width: 50%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
`;

const getImageContainerStyle = ({ type }) => {
  if (type === "signInImage") return signInImageContainerStyle;
  if (type === "signUpImage") return signUpImageContainerStyle;
  if (type === "brandImage") return brandImageContainerStyle;
  if (type === "brandLogo") return brandLogoImageContainerStyle;
  if (type === "newsletterImage") return newsletterImageContainerStyle;
  if (type === "collectionImage") return collectionImageContainerStyle;
  if (type === "brandVideoImage") return brandVideoImageContainerStyle;
  if (type === "brandVideoLogo") return brandVideoLogoImageContainerStyle;
  if (type === "itemPreviewImage") return itemPreviewImageContainerStyle;
  if (type === "homeSlideImage") return homeSlideImageContainerStyle;
  if (type === "aboutUsImage") return aboutUsImageContainerStyle;
  if (type === "contactUsImage") return contactUsImageContainerStyle;
  return defaultImageContainerStyle;
};

const loadingBlurStyle = css`
  backdrop-filter: blur(20px);
`;

const loadingContainerStyle = css`
  background-color: var(--color-gray-image);
`;

export const StyledCustomImageContainer = styled.div`
  ${(props) => getImageContainerStyle(props)}
  ${(props) => props.isLoading && loadingContainerStyle}
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    ${(props) => props.isLoading && loadingBlurStyle};
  }
`;

const defaultImageStyle = css`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const brandLogoImageStyle = css`
  height: 100%;
  width: 100%;
  min-width: 8rem;
  object-fit: cover;
  object-fit: contain !important;
`;
const newsletterImageStyle = css`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: left !important;
`;

const brandVideoLogoImageStyle = css`
  height: 80px !important;
  width: auto;
  max-width: 20rem;
  object-fit: contain !important;
  object-position: center;
`;
const itemPreviewImageStyle = css`
  ${defaultImageStyle}
  transition: transform 2s var(--cubic-bazier-function) 0s;
`;

const getImageStyle = ({ type }) => {
  if (type === "brandLogo") return brandLogoImageStyle;
  if (type === "newsletterImage") return newsletterImageStyle;
  if (type === "brandVideoLogo") return brandVideoLogoImageStyle;
  if (type === "itemPreviewImage") return itemPreviewImageStyle;
  return defaultImageStyle;
};

export const StyledCustomImage = styled.img`
  ${(props) => getImageStyle(props)}
`;

// ${(props) => getImageContainerStyle(props)}
