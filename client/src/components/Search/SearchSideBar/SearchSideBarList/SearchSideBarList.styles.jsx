import styled from "styled-components";
import { FormControlLabel, IconButton } from "@material-ui/core";
import { glassEffect } from "assets/styles/mixins.styles";
import { CloseRounded as CloseRoundedIcon } from "@material-ui/icons";

export const StyledSearchSideBarListFormControlLabel = styled(FormControlLabel)`
  & {
    .MuiSvgIcon-root {
      height: 2rem !important;
      width: 2rem !important;
    }
  }
`;
export const SearchSideBarListContainer = styled.div`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const SearchSideBarListOpenFilter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 40rem;
  width: 60rem;
  min-width: 25rem;
  min-height: 20rem;
  ${glassEffect("white")}
  background: rgba(255, 255, 255, 0.8);
  text-transform: capitalize;
`;

export const SearchSideBarListOpenFilterHeadingAndCloseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem;
  height: 20%;
  width: 100%;
`;

export const StyledSearchSideBarListOpenCloseIconButton = styled(IconButton)`
  color: var(--color-pink) !important;
  padding: 1rem !important;

  &:hover {
    background-color: var(--color-pink-very-light) !important;
  }
`;

export const StyledSearchSideBarListOpenCloseIcon = styled(CloseRoundedIcon)`
  fill: var(--color-gray-light) !important;
  height: 2.5rem !important;
  width: 2.5rem !important;
`;

export const SearchSideBarListOpenFilterCategoriesContainer = styled.div`
  padding-left: 2.5rem;
  display: flex;
  gap: 1rem;
  height: 80%;
  width: 100%;
  overflow: scroll;
  overflow-y: hidden;
  & > * {
    width: 15rem;
  }
`;

export const SearchSideBarList = styled.div`
  min-height: 26rem;
  padding: 1.5rem 2.5rem;
  ${glassEffect("white")}
  box-shadow: var(--shadow-default);
`;

export const SearchSideBarListItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-transform: capitalize;
`;

export const SearchSideBarListItemHeadingContainer = styled.div`
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const SearchSideBarListItemShowMoreText = styled.div`
  color: var(--color-pink);
  font-size: var(--font-md);
  font-weight: 500;
  cursor: pointer;
`;
