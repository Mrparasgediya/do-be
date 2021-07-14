import CustomButton from "components/CustomButton/CustomButton";
import styled from "styled-components";

export const ItemPreviewItemBrand = styled.h3`
  font-family: var(--font-family-body);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: var(--font-lg) !important;
`;
export const ItemPreviewItemName = styled.p`
  font-size: var(--font-md-big);
  margin-bottom: 1.5rem;
`;

export const ItemPreviewPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

export const ItemPreviewPrice = styled.div`
  font-weight: 700;
  font-size: var(--font-md-big);
`;

export const ItemPreviewMRP = styled.div`
  text-decoration: line-through;
  color: var(--color-gray);
  font-size: var(--font-md);
`;
export const ItemPreviewDiscount = styled.div`
  color: var(--color-pink);
  font-size: var(--font-md);
`;

export const ItemPreviewTaxInfo = styled.div`
  font-size: var(--font-md);
  color: var(--color-green);
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const ItemPreviewSizes = styled.div`
  margin-bottom: 0.5rem;
`;
export const ItemPreviewSizesHeading = styled.h4`
  font-size: var(--font-md-big) !important;
  margin-bottom: 1rem;
`;

export const ItemPreviewSizesContainer = styled.div`
  display: flex;
  align-item: center;
  gap: 1rem;
`;

export const ItemPreviewSize = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 2px solid var(--color-pink);
`;

export const ItemPreviewSizeText = styled.span`
  font-size: 1.2em;
  color: var(--color-pink);
  font-weight: 700;
  text-transform: uppercase;
`;

export const ItemPreviewWishlistAndBagButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
`;

export const StyledItemPreviewGoBackButton = styled(CustomButton)`
  margin: 1rem 0 0;
`;
