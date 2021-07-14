import styled from "styled-components";
import { glassEffect } from "assets/styles/mixins.styles";
import { ReactComponent as CloseIcon } from "../../assets/icons/wishlist/close.svg";
import { ReactComponent as ShoppingBagIcon } from "../../assets/icons/navigation/shopping-bag.svg";
import { LoadingSpinner } from "components/LoadingSpinner/LoadingSpinner.styles";
import { Link } from "react-router-dom";

export const WishlistItemContainer = styled.div`
  height: 40rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: var(--font-sm);
  transition: all 0.3s ease-in-out;
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

  @media (max-width: 425px) {
    height: 32rem !important;
  }
  @media (min-width: 426px) and (max-width: 1024px) {
    height: 35rem !important;
  }
  @media (max-width: 768px) {
    &:active {
      transform: scale(0.97);
      &::after {
        box-shadow: none;
      }
    }
  }
  @media (min-width: 769px) {
    &:hover {
      transform: translateY(-0.5rem);

      &::after {
        box-shadow: var(--shadow-hover);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }
  @media (min-width: 1025px) and(max-width: 1440px) {
    height: 38rem !important;
  }
`;

export const StyledWishlistItemCloseIcon = styled(CloseIcon)`
  height: 70%;
  width: 70%;
`;

export const WishlistItemRemoveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  box-sizing: content-box;
  height: 4rem;
  width: 4rem;
  ${glassEffect("white")}
  box-shadow: none !important;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  &:hover {
    ${glassEffect("red")}
    border-radius: 50%;
    ${LoadingSpinner} {
      color: var(--color-white);
    }

    ${StyledWishlistItemCloseIcon} {
      fill: var(--color-white);
    }

    &:active {
      transform: scale(0.9);
    }
  }

  @media (max-width: 425px) {
    height: 3.5rem;
    width: 3.5rem;
  }
`;

export const StyledWishlistItemLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`;

export const WishlistItemImageContainer = styled.div`
  overflow: hidden;
  flex: 1;
`;

export const WishlistItemContentContainer = styled.div`
  padding: 0.25rem 1rem;
  height: 6rem;
`;

export const WishlistItemNameAndBrandContainer = styled.div`
  font-size: var(--font-md);
  color: black;
  text-align: left;
`;

export const WishlistItemBrand = styled.b`
  text-transform: uppercase;
  margin-right: 0.25rem;
`;

export const WishlistItemPriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const WishlistItemMRP = styled.span`
  font-size: var(--font-sm);
  color: var(--color-gray-light);
  text-decoration: line-through;
`;
export const WishlistItemDiscount = styled.span`
  color: var(--color-pink);
`;

export const StyledWishlistBagItemShoppingBagIcon = styled(ShoppingBagIcon)`
  height: 2.5rem;
  width: 2.5rem;
  fill: var(--color-white);
`;
