import styled, { css } from "styled-components";

export const FeatureList = styled.ul`
  @media (max-width: 640px) {
    padding-left: 1rem;
  }
`;

export const FooterListHeading = styled.h5`
  font-size: var(--font-md-big);
  text-transform: uppercase;
  margin-bottom: 1rem;
  margin-top: ${(props) => (props.type = "svg" && "2.5rem")};
`;

const footerListIconStyle = css`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const FooterList = styled.ul`
  ${(props) => props.type === "icon" && footerListIconStyle}
`;

const featureFooterListImageStyle = css`
  width: 6rem;
  object-fit: contain;
`;

export const FooterListImage = styled.img`
  width: 100%;
  object-fit: contain;
  ${(props) => props.type === "featureListImage" && featureFooterListImageStyle}
`;

const featureFooterListItemStyle = css`
  display: flex;
  align-items: center;
  gap: 2rem;

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const footerItemHoverEffect = css`
  &:hover {
    color: #777777;
  }
`;

export const FooterListItem = styled.li`
  font-size: var(--font-md);
  color: #333333;
  ${(props) => props.type !== "downloadImage" && listWithMarginBottomStyle}
  ${(props) => props.type === "featureListItem" && featureFooterListItemStyle}
  ${(props) => props.hasHoverEffect && footerItemHoverEffect}
  cursor: ${(props) => (props.hasLink ? "pointer" : "auto")};
`;

const listWithMarginBottomStyle = css`
  ${FooterListItem}:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const FeatureListTextContainer = styled.div`
  width: 100%;
  font-size: 1.5rem;
`;
