import styled, { css } from "styled-components";

const collectionListStyle = css`
  text-transform: capitalize !important;
  flex: 1;
  text-align: center;
  display: block;

  > li:not(:last-child) {
    margin-right: 1.5rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const iconListStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    flex: 1;
    text-align: right;
  }
`;
const menuListStyle = css`
  margin-top: 8rem;
  padding: 5rem;
  width: 100%;
  > li:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const getListContainerStyle = ({ listType }) => {
  if (listType === "collectionList") return collectionListStyle;
  if (listType === "iconList") return iconListStyle;
  if (listType === "menuList") return menuListStyle;
};

export const ListContainer = styled.ul`
  ${(props) => getListContainerStyle(props)}
`;
