import styled, { css } from "styled-components";

// button size styles
const smallButtonStyle = css`
  width: 18rem;
  height: 5rem;
  padding: 0rem 1rem;
  font-size: var(--font-sm);

  @media (max-width: 640px) {
    width: 12rem;
    padding: 1rem 0.2rem;
  }
`;

const extraSmallButtonStyle = css`
  width: max-content;
  height: min-content;
  padding: 1rem;
  font-size: var(--font-xsm);
  margin: 0;

  @media (max-width: 640px) {
    padding: 1.2rem 1rem;
    max-width: 15rem;
  }
`;

const fullButtonStyle = css`
  width: 100%;
  height: 6rem;
  padding: 2rem 3rem;
`;

// alignment styles
const alignCenterButtonStyle = css`
  margin-left: auto;
  margin-right: auto;
`;

//  all button color styles
const blackButtonStyle = css`
  color: var(--color-black);
  border: var(--default-border);

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`;

const skyblueButtonStyle = css`
  color: var(--color-skyblue);
  border: 1px solid var(--color-skyblue);

  &:hover {
    background-color: var(--color-skyblue);
    color: var(--color-white);
  }
`;

const redButtonStyle = css`
  color: var(--color-red);
  border: 1px solid var(--color-red);

  &:hover {
    background-color: var(--color-red);
    color: var(--color-white);
  }
`;

const pinkButtonStyle = css`
  color: var(--color-pink);
  border: 1px solid var(--color-pink);

  &:hover {
    background-color: var(--color-pink);
    color: var(--color-white);
  }
`;
const greenButtonStyle = css`
  color: var(--color-green);
  border: 1px solid var(--color-green);

  &:hover {
    background-color: var(--color-green);
    color: var(--color-white);
  }
`;

// active button styles
const pinkActiveButtonStyle = css`
  background-color: var(--color-pink);
  color: var(--color-white);
  &:hover {
    background-color: var(--color-pink);
    color: var(--color-white);
  }
`;

const redActiveButtonStyle = css`
  background-color: var(--color-red);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-red);
    color: var(--color-white);
  }
`;

const blackActiveButtonStyle = css`
  border: var(--default-border);
  background-color: var(--color-black);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-black);
    color: var(--color-white);
  }
`;

const skyblueActiveButtonStyle = css`
  color: var(--color-white);
  border: 1px solid var(--color-skyblue);
  background-color: var(--color-skyblue);

  &:hover {
    background-color: var(--color-skyblue);
    color: var(--color-white);
  }
`;
const greenActiveButtonStyle = css`
  color: var(--color-white);
  border: 1px solid var(--color-green);
  background-color: var(--color-green);

  &:hover {
    background-color: var(--color-green);
    color: var(--color-white);
  }
`;

// all types of button styles
const oauthButtonStyle = css`
  min-width: 32rem;
  padding: 0 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  > svg {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
  }
  &:hover {
    > svg {
      fill: var(--color-white);
    }
  }
`;

const wishlistButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  height: auto;
  width: 100%;
  background-color: var(--color-skyblue);

  &:hover {
    background-color: var(--color-skyblue);
    color: var(--color-white);
  }

  &:active {
    transform: none;
  }
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const searchButtonStyle = css`
  height: min-content;
  width: min-content;
  padding: 0;
  border: none;
  transform: scale(1);
  background-color: transparent;

  > svg {
    height: 30px;
    width: 30px;
  }

  &:hover {
    background-color: transparent;
    > svg {
      fill: var(--color-white);
    }
  }
  &:active {
    background-color: transparent;
    > svg {
      fill: var(--color-white);
    }
  }

  @media (max-width: 640px) {
    height: min-content;
    width: min-content;
    padding: 0;
    border: none;
    transform: scale(1);

    &:hover {
      background-color: transparent;
      > svg {
        fill: var(--color-white);
      }
    }
    &:active {
      > svg {
        fill: var(--color-white);
      }
    }
  }
`;

const getButtonSizeStyle = ({ size }) => {
  if (size === "xs") return extraSmallButtonStyle;
  if (size === "small") return smallButtonStyle;
  if (size === "full") return fullButtonStyle;
};

const getColorStyle = ({ color }) => {
  if (color === "red") return redButtonStyle;
  if (color === "pink") return pinkButtonStyle;
  if (color === "skyblue") return skyblueButtonStyle;
  if (color === "black") return blackButtonStyle;
  if (color === "green") return greenButtonStyle;
};

const getButtonStyleByType = ({ buttonType }) => {
  if (buttonType === "wishlist") return wishlistButtonStyle;
  if (buttonType === "search") return searchButtonStyle;
  if (buttonType === "oauth") return oauthButtonStyle;
};

const getButtonActiveStyles = ({ color, isActive }) => {
  if (isActive && color === "red") return redActiveButtonStyle;
  if (isActive && color === "pink") return pinkActiveButtonStyle;
  if (isActive && color === "black") return blackActiveButtonStyle;
  if (isActive && color === "skyblue") return skyblueActiveButtonStyle;
  if (isActive && color === "green") return greenActiveButtonStyle;
};

const getAlignStyle = ({ align }) => {
  if (align === "center") return alignCenterButtonStyle;
};
const hasLoadingStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StyledCustomButton = styled.button`
  height: 6rem;
  width: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 0.1rem solid var(--color-white);
  color: var(--color-white);
  letter-spacing: 0.15rem;
  padding: ${(props) =>
    props.hasSmallLoadingText ? "1rem 2rem" : "2rem 3rem"};
  border: 0.1rem solid var(--color-white);
  font-size: ${(props) =>
    props.hasSmallLoadingText ? "var(--font-xs)" : "var(--font-md)"};
  font-family: var(--font-family-body);
  margin: 1rem 0;
  text-transform: uppercase;
  transition: transform 0.3s, background-color 0.5s;

  @media (min-width: 768px) {
    cursor: pointer;
  }

  > svg {
    height: 2.5rem;
    width: 2.5rem;
    margin-right: 1rem;
  }

  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover {
    background-color: var(--color-white);
    color: var(--color-black);
  }
  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 640px) {
    width: 20rem;
    letter-spacing: 0.1rem;
    padding: 1rem 2rem;
  }

  ${(props) => getButtonSizeStyle(props)}
  ${(props) => getColorStyle(props)}
  ${(props) => getButtonStyleByType(props)}
  ${(props) => getButtonActiveStyles(props)}
  ${(props) => getAlignStyle(props)}
  ${(props) => props.hasLoading && hasLoadingStyle}
`;
