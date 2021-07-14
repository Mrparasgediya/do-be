import styled, { css } from "styled-components";
import { glassEffect } from "assets/styles/mixins.styles";

export const StyledPaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
`;

const cardOptionStyle = css`
  &::before {
    transform: translateX(100%);
  }
`;
const codOptionStyle = css`
  &::before {
    transform: translateX(0%);
  }
`;

const getCurrentOptionStyle = ({ currentoption }) => {
  if (currentoption === "card") return cardOptionStyle;
  if (currentoption === "cod") return codOptionStyle;
};

export const StyledPaymentSelectContainer = styled.div`
  color: var(--color-pink);
  box-shadow: var(--shadow-default);
  height: 50px;
  width: 30rem;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:active {
    transform: scale(0.98);
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    height: 100%;
    width: 50%;
    ${glassEffect("darkPink")}
    transition: transform 0.4s var(--cubic-bazier-function);
    box-shadow: none;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }

  @media (max-width: 768px) {
    transform: scale(0.9);
    &:active {
      transform: scale(0.85);
    }
  }

  ${(props) => getCurrentOptionStyle(props)}
`;

export const StyledPaymentSelectInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

export const StyledPaymentSelectTextContainer = styled.div`
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  align-items: center;
`;

const selectedTextStyle = css`
  color: var(--color-white);
`;
const deSelectedTextStyle = css`
  color: var(--color-pink);
`;

const getSelecteTextStyle = ({ isselected }) => {
  return isselected ? selectedTextStyle : deSelectedTextStyle;
};

export const StyledPaymentSelectText = styled.span`
  flex: 1;
  text-align: center;
  font-weight: 700;
  font-size: var(--font-md) !important;
  transition: color 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: var(--font-md-big);
  }
  ${(props) => getSelecteTextStyle(props)}
`;

export const StyledPaymentDetailsContainer = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledPaymenCODContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-size: var(--font-md);
  font-weight: 700;
`;

export const StyledPaymentCODHeading = styled.b`
  font-size: var(--font-md-big);
`;

export const StyledPaymentCODText = styled.p`
  margin-top: 2rem;
`;
