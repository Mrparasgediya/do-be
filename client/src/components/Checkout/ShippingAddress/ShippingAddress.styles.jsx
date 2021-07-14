import { FormControlLabel } from "@material-ui/core";
import CustomButton from "components/CustomButton/CustomButton";
import InputField from "components/InputField/InputField";
import styled from "styled-components";

export const ShippingAddressForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ShippingAddressFormControlLabel = styled(FormControlLabel)`
  & {
    .MuiSvgIcon-root {
      height: 2rem !important;
      width: 2rem !important;
    }
    .MuiTypography-body1 {
      font-size: var(--font-md) !important;
    }
  }
`;

export const ShippingAddressUseDetailsButton = styled(CustomButton)`
  align-self: flex-start;
  margin-bottom: 1rem;
`;

export const ShippintAddressContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 3rem;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ShippingAddressInputsAndHeadingContainer = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ShippingAddressHeading = styled.h4`
  margin-bottom: 1rem;
`;

export const ShippintAddressInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledShippingAddressCapitalizedInput = styled(InputField)`
  & {
    .MuiInput-input {
      text-transform: capitalize;
    }
  }
`;
