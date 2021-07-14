import styled, { css } from "styled-components";
import { glassEffect } from "assets/styles/mixins.styles";

export const BagPriceGlassEffectStyle = css`
  box-shadow: var(--shadow-default);
  height: min-content;
  ${glassEffect("white")}
`;

export const LargeScreenBagPriceInfoContainer = styled.div`
  ${BagPriceGlassEffectStyle}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  width: 80%;
  min-height: 22rem;
  text-align: center;

  @media (max-width: 959px) {
    width: 100%;
  }

  @media (min-width: 769px) and (max-width: 959px) {
    transform: scale(0.98);
  }
  @media (min-width: 1440px) {
    padding: 1rem;
  }
`;

export const SmallScreenBagPriceInfoContainer = styled.div`
  ${BagPriceGlassEffectStyle}
  width: 95%;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;

  > button {
    height: 80%;
  }
`;

export const SmallScreenBagPriceDetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  font-size: var(--font-md);
`;

export const SmallScreenBagPriceDetails = styled.div`
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
export const SmallScreenBagPriceDetailsText = styled.span`
  margin-right: 1rem;
`;
export const SmallScreenBagPriceDetailsViewMoreText = styled.span`
  color: var(--color-pink);
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--color-pink) !important;
`;
