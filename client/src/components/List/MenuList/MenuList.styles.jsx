import styled, { css } from "styled-components";
import { glassEffect } from "../../../assets/styles/mixins.styles";

//list menu style
const navListStyle = css`
  position: absolute;
  top: 4.8rem;
  left: -10rem;
  height: 200px;
  width: 650px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0;
  ${glassEffect("black")}
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: none;
  transition: visibility 0.1s;
  visibility: ${(props) => (props.toggleMenu ? "visible" : "hidden")};
`;

const profileNavListStyle = css`
  left: -2.5rem;
  width: 8rem;
  min-width: max-content;
  height: min-content;
`;

const getMenuStyle = (menuType) => {
  if (menuType === "navMenu") {
    return navListStyle;
  }

  if (menuType === "profileMenu") {
    return css`
      ${navListStyle}
      ${profileNavListStyle}
    `;
  }
};
// list item style
const navListItemStyle = css`
  text-align: left;
  margin-bottom: 0.3rem;
  width: 100px;
  font-weight: 700;
  font-size: 1.5rem;
`;

const profileNavListItemStyle = css`
  width: 100% !important;
`;

const getMenuListItemStyle = (menuType) => {
  if (menuType === "navMenu") {
    return navListItemStyle;
  }

  if (menuType === "profileMenu") {
    return css`
      ${profileNavListItemStyle}
      ${navListItemStyle}
    `;
  }
};

// container styles
export const MenuListContainer = styled.ul`
  ${(props) => getMenuStyle(props.menuType)}
`;

export const MenuListItem = styled.li`
  ${(props) => getMenuListItemStyle(props.menuType)}
  cursor:pointer;
  &:hover {
    color: var(--color-pink);
  }

  &:active {
    color: var(--color-pink);
  }
`;
