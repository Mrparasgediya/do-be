import styled, { css } from "styled-components";

const iconListItemStyle = css`
  display: inline-block;
  margin-left: 1.5rem;
  text-align: center;
  cursor: pointer;
`;
const collectionListItemStyle = css`
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-white);
  cursor: pointer;

  &:hover {
    color: var(--color-pink);
  }

  &:active {
    color: var(--color-pink);
  }
`;
const defaultListItemStyle = css`
  display: inline;
`;

const getListItemStyle = (listItemType) => {
  if (listItemType === "iconListItem") return iconListItemStyle;
  if (listItemType === "menuListItem") return collectionListItemStyle;
  return defaultListItemStyle;
};

const getHideIconStyle = css`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const ListItem = styled.li`
  ${(props) => getListItemStyle(props.listItemType)}
  ${(props) => props.hideIcon && getHideIconStyle}
`;

export const NavMenuListitemContainer = styled.span`
  position: relative;
`;
export const NavMenuListItem = styled.span`
  cursor: pointer;
`;
