import styled from "styled-components";

export const DeleteBrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BrandInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
`;

export const DeleteBrandContentContainer = styled.div`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BrandLogo = styled.img`
  max-height: 100px;
  max-width: 250px;
  objectfit: contain;
`;

export const BrandInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BrandInfoText = styled.p`
  font-size: 2rem;
  font-weight: 700;
  text-transform: capitalize;
  color: ${(props) => (props.color === "red" ? "var(--color-red)" : "black")};
`;

export const DeleteMessageHeading = styled.h3`
  font-family: var(--font-family-body);
  font-size: var(--font-md-big) !important;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;
