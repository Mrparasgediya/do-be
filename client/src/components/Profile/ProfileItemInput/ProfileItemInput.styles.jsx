import styled from "styled-components";
import CustomButton from "components/CustomButton/CustomButton";

export const ProfileItemInputForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileItemInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

export const StyledProfileItemInputCustomButton = styled(CustomButton)`
  margin: 0;
`;
