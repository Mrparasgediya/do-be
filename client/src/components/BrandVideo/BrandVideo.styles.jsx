import CustomImage from "components/CustomImage/CustomImage";
import styled from "styled-components";

export const BrandVideoContainer = styled.div`
  width: auto;
  height: 100vh;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
`;

export const BrandVideoOverlay = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const BrandVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
`;

export const BrandVideoContentContainer = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 50%;
  width: max-content;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1;

  > button {
    box-sizing: border-box;
  }
  @media (max-width: 425px) {
    margin-top: 80vh;
    width: 100%;
  }
`;

export const BrandVideoContentHeading = styled.h3`
  font-family: var(--font-family-body);
  text-align: center;
  font-size: 4rem !important;
  font-weight: 300 !important;
  text-transform: uppercase;
  color: var(--color-white);

  @media (max-width: 425px) {
    font-size: 3rem !important;
  }
`;

export const StyledBrandVideoCustomImage = styled(CustomImage)`
  opacity: ${(props) => (props.isLoaded ? 0 : 1)};
`;
