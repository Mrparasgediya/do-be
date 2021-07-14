import styled, { css } from "styled-components";
import { IconButton } from "@material-ui/core";
import { glassEffect } from "assets/styles/mixins.styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const SearchItemImageContainer = styled.div`
  flex: 1;
  height: auto;
  width: 100%;
  overflow: hidden;
  @media (max-width: 768px) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export const SearchItemContainer = styled.div`
  color: black;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dddddd;
  transition: box-shadow 0.1s ease-in-out;
  cursor: pointer;
  border-radius: 1rem;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-default);
  }

  @media (max-width: 768px) {
    cursor: auto;
    border-radius: 0;
    &:hover {
      box-shadow: none;
    }
  }
`;

export const SearchItemInfo = styled.div`
  position: relative;
  display: flex;
  padding: 0.5rem 1rem;
`;

export const StyledSearchItemIconButton = styled(IconButton)`
  position: absolute !important;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);
  color: var(--color-pink) !important;
  height: 5rem !important;
  width: 5rem !important;
  padding: 1rem !important;
  ${glassEffect("pink")}
  border-radius: 50% !important;
  &:hover {
    background: rgba(222, 33, 114, 0.25) !important;
  }
`;

const iconStyle = css`
  height: 2.5rem !important;
  width: 2.5rem !important;
`;

export const StyledSearchItemFavouriteIcon = styled(FavoriteIcon)`
  ${iconStyle}
`;
export const StyledSearchItemFavouriteBorderOutlinedIcon = styled(
  FavoriteBorderOutlinedIcon
)`
  ${iconStyle}
`;

export const SearchItemInfoContainer = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  @media (max-width: 768px) {
    padding: 1rem 0rem;
  }
`;

export const SearchItemHoverInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SearchItemHoverSizesContainer = styled.div`
  font-size: var(--font-md);
  font-weight: 300;
  display: flex;
  gap: 1rem;
  text-transform: capitalize;
`;

export const SearchItemHoverSize = styled.div`
  color: var(--color-gray-light);
  text-transform: uppercase;
`;

export const SearchItemName = styled.div`
  font-size: var(--font-sm);
`;
export const SearchItemBrand = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: var(--font-md);
`;

export const SearchItemPriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  font-size: var(--font-sm);
`;
export const SearchItemPrice = styled.span`
  font-weight: 700;
  font-size: var(--font-md);
`;
export const SearchItemMRP = styled.span`
  text-decoration: line-through;
`;
export const SearchItemDiscount = styled.span`
  color: var(--color-pink);
  text-transform: uppercase;
`;

const infoButtonStyle = css`
  ${iconStyle}
  align-self: center !important;
  color: var(--color-pink);
  @media (max-width: 768px) {
    padding: 0 !important;
  }
`;

export const SearchItemInfoButtonWithFavoriteIcon = styled(FavoriteIcon)`
  ${infoButtonStyle}
`;
export const SearchItemInfoButtonWithFavouriteBorderOutlinedIcon = styled(
  FavoriteBorderOutlinedIcon
)`
  ${infoButtonStyle}
`;
