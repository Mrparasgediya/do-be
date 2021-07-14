import CustomContainer from "components/CustomContainer/CustomContainer";
import styled from "styled-components";

export const StyledCheckoutCustomContainer = styled(CustomContainer)`
  min-height: 60rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckoutPanelContainer = styled.div`
  flex: 1;
  display: flex;
  min-width: 60%;
  justify-content: center;
  margin-bottom: 10%;

  @media (max-width: 768px) {
    margin-bottom: 25%;
    min-width: 80%;
  }
`;
