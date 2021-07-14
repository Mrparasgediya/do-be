import styled from "styled-components";
import { FormControlLabel, ListItem } from "@material-ui/core";
import CustomButton from "components/CustomButton/CustomButton";

export const FilterPanelContainer = styled.div`
  background: var(--color-white);
  position: fixed;
  height: calc(100vh - 16rem);
  width: 100%;
  margin-top: 8rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  zindex: 2;
  display: flex;
`;
export const StyledFilterPanelFormControlLabel = styled(FormControlLabel)`
  & {
    .MuiSvgIcon-root {
      height: 2rem !important;
      width: 2rem !important;
    }
    .MuiButtonBase-root {
      color: var(--color-pink);
    }
  }
`;

export const FilterPanelListContainer = styled.div`
  flex: 0.4;
  display: flex;
  padding-bottom: 2rem;
  flex-direction: column;
`;

export const StyledFilterPanelApplyFilterCustomButton = styled(CustomButton)`
  margin-top: auto;
`;
export const FilterPanelListItemsContainer = styled.div`
  display: flex;
  flex: 0.6;
  overflow: scroll;
  flex-direction: column;
  padding-left: 2rem;
  border-left: 1px solid var(--color-gray-light);
`;

export const StyledListItem = styled(ListItem)`
  font-size: 1.8rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;
