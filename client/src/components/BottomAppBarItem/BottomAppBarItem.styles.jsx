import styled, { css } from "styled-components";

const pinkColor = "var(--color-pink)";
const grayColor = "var(--color-gray)";
const skyblueColor = "var(--color-skyblue)";
const whiteColor = "var(--color-white)";

const pinkItemColorStyle = css`
  color: ${pinkColor};
`;
const skyblueItemColorStyle = css`
  color: ${skyblueColor};
`;
const defaultItemColoStyle = css`
  color: ${grayColor};
`;

const getItemColor = ({ color }) => {
  if (color === "skyblue") return skyblueItemColorStyle;
  if (color === "pink") return pinkItemColorStyle;
  return defaultItemColoStyle;
};

const pinkActiveItemStyle = css`
  background-color: ${pinkColor};
  color: ${whiteColor};
  border: none;
`;

const skyblueActiveItemStyle = css`
  background-color: ${skyblueColor};
  color: ${whiteColor};
  border: none;
`;

const disabledStyle = css`
  opacity: 0.5;
`;

const getActiveItemStyle = ({ color, isActive }) => {
  if (isActive && color === "pink") return pinkActiveItemStyle;
  if (isActive && color === "skyblue") return skyblueActiveItemStyle;
};

export const BottomAppBarItemContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  height: 100%;
  ${(props) => props.hasRightBorder && `border-right: 0.1rem solid #7f8c8d;`}
  ${(props) => getItemColor(props)}
  ${(props) => getActiveItemStyle(props)}
  ${(props) => props.disabled && disabledStyle}
`;

export const BottomAppBarItemName = styled.span`
  text-transform: capitalize;
  font-size: 2rem;
`;
