import styled, { css } from "styled-components";
import { glassEffect } from "../../../assets/styles/mixins.styles";
import { StyledCustomImageContainer } from "components/CustomImage/CustomImage.styles";

// branditem style
const brandItemStyle = css`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1rem;
  width: auto;
  height: auto;

  media(max-width:768px) {
    min-height: 30rem;
  }

  @media (min-width: 769px) {
    min-height: 32rem;
  }
`;

// collection item style

export const CollectionListItemContentContainer = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 2rem;
  text-align: center;
  transform: translateX(-50%);
  width: 75%;
  height: auto;
  visibility: hidden;

  > button {
    width: 100%;
  }

  @media (min-width: 769px) {
    opacity: 0;
    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    visibility: visible;
    > button {
      display: none;
    }
  }
`;

export const CollectionListItemHading = styled.h3`
  width: 100%;
  text-align: center;
  font-family: var(--font-family-body);
  text-transform: capitalize;
`;

const collectionItemStyle = css`
  position: relative;
  min-height: 38rem;
  width: 100%;
  overflow: hidden;
  color: var(--color-white);

  &:hover {
    ${CollectionListItemContentContainer} {
      opacity: 1;
      visibility: visible;
    }
    > ${StyledCustomImageContainer} {
      filter: brightness(0.6);
    }
  }

  @media (max-width: 768px) {
    min-height: 22rem;
  }

  @media (min-width: 426px) and (max-width: 1024px) {
    min-height: 35rem;
  }

  @media (min-width: 1025px) and (max-width: 1440px) {
    min-height: 32rem;
  }
`;

const getItemStyle = ({ itemType }) => {
  if (itemType === "brandItem") return brandItemStyle;
  if (itemType === "collectionItem") return collectionItemStyle;
};

export const CollectionListItem = styled.div`
  ${glassEffect("white")}
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;
  padding-bottom: 1.5rem;

  @media (min-width: 768px) {
    cursor: pointer;
  }

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

  ${(props) => getItemStyle(props)}

  @media (max-width: 768px) {
    transition: transform 0.3s ease-out;
    &:active {
      transform: scale(0.95);

      &::after {
        box-shadow: none;
      }
    }
  }
  @media (min-width: 769px) {
    transform: scale(0.98);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-0.5rem) scale(1);

      &::after {
        box-shadow: var(--shadow-hover);
      }
    }
    &:active {
      transform: translateY(0) scale(0.98);
    }
  }
`;

export const CollectionListItemBrandInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
`;

export const CollectionListItemBrandDicountHeading = styled.h3`
  color: var(--color-gray--font);
  font-weight: 400;
`;
