import styled from "styled-components";
import CustomAutoCompleteSelect from "../CustomAutoCompleteSelect/CustomAutoCompleteSelect";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import InputField from "components/InputField/InputField";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  align-items: flex-start;
`;

export const StyledLable = styled.label`
  font-size: var(--font-md);
  font-weight: 700;
  text-transform: capitalize;
`;

export const StyledCustomSelect = styled(CustomSelect)`
  min-width: 75%;
`;

export const StyledCustomAutoComplete = styled(CustomAutoCompleteSelect)`
  min-width: 75%;
`;
export const StyledInputField = styled(InputField)`
  min-width: 75%;
`;
