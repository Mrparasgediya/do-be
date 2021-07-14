import styled, { css } from "styled-components";
import { Container } from "@material-ui/core";
import { glassEffect } from "../../assets/styles/mixins.styles";

const largeContainerStyle = css`
  width: 55vw !important;

  @media (max-width: 425px) {
    width: 95vw !important;
    height: min-content !important;
    min-height: 50rem !important;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    width: 70vw !important;
    min-height: 60rem !important;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 80vw !important;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 70vw !important;
  }
`;
const smallContainerStyle = css`
  width: 30vw !important;
  min-height: 25rem !important;
  margin-bottom: 30vh;

  @media (max-width: 425px) {
    width: 75vw !important;
    height: min-content !important;
    min-height: 35rem !important;
  }

  @media (min-width: 426px) and (max-width: 768px) {
    width: 50vw !important;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 40vw !important;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    width: 30vw !important;
  }
`;

const getContainerStyle = ({ size }) => {
  if (size === "large") return largeContainerStyle;
  if (size === "small") return smallContainerStyle;
};

const checkoutContainerStyle = css`
  min-height: 50rem;
  padding: 2.5rem;
`;

export const CustomContainer = styled(Container)`
  position: relative;
  margin: 15vh auto 5vh;
  height: min-content;
  padding: 0;
  box-shadow: var(--shadow-default);
  ${glassEffect("white")}

  ${(props) => (props.isforcheckout ? checkoutContainerStyle : "")}
  ${(props) => getContainerStyle(props)}
`;
