import styled from "styled-components";
import { glassEffect } from "assets/styles/mixins.styles";
import { Link } from "react-router-dom";

export const BagItemContainer = styled.div`
  margin: 0 auto 2.5rem;
  height: 25rem;
  width: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  ${glassEffect("white")}

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 1rem;
    transition: box-shadow 0.3s ease-out;
    box-shadow: var(--shadow-default);
  }
  @media (max-width: 768px) {
    cursor: auto;
    &:active {
      transform: scale(0.97);
      &::after {
        box-shadow: none;
      }
    }
  }
  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-0.25rem);

      &::after {
        box-shadow: var(--shadow-hover);
      }
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
`;

export const BagItemImageContainer = styled(Link)`
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  flex: 0.25;
  overflow: hidden;
  @media (max-width: 425px) {
    flex: 0.4;
  }
`;

export const BagItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.75;
  padding: 1.5rem 2rem;

  @media (max-width: 425px) {
    flex: 0.6;
  }
`;

export const BagItemNameAndPriceContainer = styled.div`
  display: flex;
`;
export const BagItemNameAndBrandContainer = styled.div`
  flex: 0.75;
`;

export const BagItemBrandName = styled.h4`
  text-transform: uppercase;
`;
export const BagItemName = styled.h4`
  flex-wrap: wrap;
`;

export const BagItemPriceContainer = styled.div`
  text-align: right;
  flex: 0.25;
`;
export const BagItemNewPrice = styled.h4``;

export const BagItemMRPandDiscountContainer = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
`;
export const BagItemMRP = styled.span`
  margin-right: 0.3rem;
  color: var(--color-gray);
  font-size: var(--font-sm);
  text-decoration: line-through;
`;
export const BagItemDiscount = styled.span`
  color: var(--color-pink);
`;

export const BagItemSizeAndQtyContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const BagItemSelectMenu = styled.div`
  display: flex;
  margin-right: 1.5rem;
  align-items: center;
`;
export const BagItemSelectMenuHeading = styled.h4`
  margin-right: 1rem;
`;
export const BagItemErrorMessage = styled.span`
  color: var(--color-red);
  font-size: var(--font-sm);
  text-transform: uppercase;
`;

export const BagItemButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
