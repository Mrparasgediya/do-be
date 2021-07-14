import styled, { css } from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { glassEffect } from "assets/styles/mixins.styles";

const getTextStyle = (displayText) => {
  return css`
    &::after {
      content: "${displayText}";
      text-transform: capitalize;
      font-size: var(--font-md);
      position: absolute;
      font-weight: 700;
      width: max-content;
      min-width: 100px;
      height: 100px;
      border: 10px splid blue;
      left: 50%;
      top: 125%;
      text-align: center;
      transform: translateX(-50%);
    }
  `;
};

export const LoadingSpinnerContainer = styled.div`
  ${glassEffect("white")}
  position: absolute;
  z-index: 2;
  background-color: white;
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-default);
  top: ${({ placeCenter }) => (placeCenter ? "50%" : "30%")};
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ hasLoadingText, displayText }) =>
    hasLoadingText && getTextStyle(displayText)}
`;

export const LoadingSpinner = styled(CircularProgress)`
  height: 60% !important;
  width: 60% !important;
  color: var(--color-pink);
`;
