import InputField from "components/InputField/InputField";
import styled from "styled-components";

export const AddressDetailsContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.hasaddress ? "flex-start" : "center")};
  justify-content: space-between;
  text-transform: capitalize;
`;

export const AddressDetailsDialogForm = styled.form`
  display: flex;
  min-width: 80%;
  max-width: 95%;
  flex-direction: column;
  gap: 1rem;
`;

export const CapitalizedAddressDetailsInputField = styled(InputField)`
  & {
    .MuiInput-input {
      text-transform: capitalize;
    }
  }
`;

export const AddressDetailsAddress = styled.address`
  flex: 1;
`;
