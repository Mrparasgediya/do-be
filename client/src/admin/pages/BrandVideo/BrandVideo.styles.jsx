import styled, { css } from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 2.5rem;
  margin: 2rem 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5rem;
  gap: 2rem;
`;

export const StyledInfoText = styled.b`
  font-size: 2rem;
  text-transform: capitalize;
`;
export const StyledBoldInfoText = styled.b`
  font-size: var(--font-md-big);
`;

export const ItemContainer = styled.div`
  text-transform: capitalize;
`;

export const StyledValueText = styled.span`
  font-size: var(--font-md-big);
  margin-left: 2rem;
`;
const resourceContainerStyle = css`
  max-width: 80%;
`;
export const BrandResourceContainer = styled.div`
  ${resourceContainerStyle}
`;

export const BrandVideosContainer = styled.div`
  ${resourceContainerStyle}
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const resourceStyle = css`
  max-width: 640px;
  max-height: 480px;
  object-fit: contain;
`;
export const BrandImage = styled.img`
  ${resourceStyle}
`;

export const BrandVideo = styled.video`
  ${resourceStyle}
`;
