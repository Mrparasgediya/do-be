import CustomButton from "components/CustomButton/CustomButton";
import styled from "styled-components";

const scriptColors = {
  Mens: "#0bbcde",
  Womens: "#fae201",
  girls: "#de2172",
};

export const SliderDataContainer = styled.div`
  position: absolute;
  box-sizing: content-box;
  color: var(--color-white);
  width: 60vw;
  min-width: min-content;
  height: min-content;
  min-height: min-content;
  display: flex;
  flex-direction: column;
  top: calc(100% - 50%);
  left: calc(100% - 85%);

  @media (max-width: 425px) {
    width: 90vw;
    height: 20rem;
    bottom: 20rem;
    top: calc(100% - 40%);
    left: calc(100% - 90%);
  }
  @media (min-width: 1024px) and (max-width: 1440px) {
    top: calc(100% - 60%);
  }
`;

export const HeadingScript = styled.span`
  letter-spacing: 0.5rem;
  font-weight: 100;
  font-family: "Halaney";
  color: ${(props) => scriptColors[props.collectionName]};
`;

export const SliderDiscountContainer = styled.div`
  font-size: var(--font-lg);
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  width: 100%;
  flex: 0.25;
  display: flex;
  flex-direction: column;

  @media (max-width: 425px) {
    font-size: var(--font-md-big);
  }
`;

export const SliderHeading = styled.h1`
  font-weight: 400;
  font-family: var(--font-family-heading);
  line-height: 6.5rem;
  letter-spacing: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1;

  @media (max-width: 425px) {
    line-height: 3.5rem;
    letter-spacing: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const StyledCustomButton = styled(CustomButton)`
  width: 20rem;
  @media (max-width: 425px) {
    font-size: var(--font-sm);
    padding: 2rem 3rem;
    width: 15rem !important;
  }
`;
