import CustomButton from "components/CustomButton/CustomButton";
import styled from "styled-components";

export const RemoveBagItemDialogItemsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const RemoveBagItemDialogImage = styled.img`
  flex: 0.25;
  height: 18rem;
  width: auto;
  object-fit: contain;
`;

export const RemoveBagItemDialogDescription = styled.p`
  flex: 1;
  word-wrap: break-word;
  font-size: var(--font-md) !important;
`;

export const RemoveBagItemDialogButton = styled(CustomButton)`
  margin: 0;
  flex: 1;
`;
