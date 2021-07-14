import styled, { css } from "styled-components";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

const fullWidthStyle = css`
  width: 300px;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
`;

const pinkSelectStyle = css`
  .MuiInput-underline {
    &:before {
      border-bottom: 1px solid var(--color-pink) !important;
    }
    &:after,
    &:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid var(--color-pink) !important;
    }
  }
`;
const defaultSelectStyle = css`
  .MuiInput-underline {
    &:before {
      border-bottom: 1px solid var(--color-black) !important;
    }
    &:after,
    &:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid var(--color-black) !important;
    }
  }
`;

const getSelectColorStyle = ({ selectcolor }) => {
  if (selectcolor === "pink") return pinkSelectStyle;
  return defaultSelectStyle;
};

export const StyledCustomSelect = styled(Select)`
  font-size: var(--font-md) !important;
  ${(props) => props.fullWidth && fullWidthStyle}
`;

export const StyledCustomSelectFormControl = styled(FormControl)`
  ${(props) => getSelectColorStyle(props)}
`;

export const StyledCustomSelectMenuItem = styled(MenuItem)`
  font-size: var(--font-md) !important;
`;

export const StyledCustomSelectInputLabel = styled(InputLabel)`
  font-size: var(--font-md);
  & {
    &.MuiInputLabel-shrink {
      color: black !important;
    }
  }
`;
