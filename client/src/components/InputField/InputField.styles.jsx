import styled, { css } from "styled-components";
import { TextField } from "@material-ui/core";

const primaryInputStyle = css`
  .MuiInputLabel-root {
    font-size: var(--font-md) !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }

  .MuiFormHelperText-root {
    color: rgba(0, 0, 0, 0.7) !important;
    font-size: var(--font-sm) !important;
  }

  .MuiInputLabel-shrink {
    color: var(--color-black) !important;
    transform: translate(0, 1.5px) scale(0.8) !important;
  }

  .MuiInput-underline:after {
    border-bottom-color: var(--color-black) !important;
  }

  .MuiInputBase-root {
    font-size: var(--font-md) !important;
  }
  .MuiInputBase-root:hover {
    border-bottom-color: pink !important;
  }

  // to change color of input border

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid rgba(0, 0, 0, 0.5) !important;
  }

  .MuiFormLabel-root.Mui-error {
    color: #f44336 !important;
  }
  .MuiFormLabel-asterisk.Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline.Mui-error:after {
    transform: scaleX(1) !important;
    border-bottom-color: #f44336 !important;
  }

  .MuiFormHelperText-root.Mui-error {
    color: #f44336 !important;
  }
`;

const secondaryInputStyle = css`
  input {
    color: var(--color-white) !important;
    font-size: var(--font-md) !important;
  }
  .MuiInputLabel-root {
    font-size: var(--font-md) !important;
    color: var(--color-white) !important;
  }

  .MuiFormHelperText-root {
    color: var(--color-white) !important;
    font-size: var(--font-sm) !important;
  }

  .MuiInputLabel-shrink {
    color: var(--color-white) !important;
    transform: translate(0, 1.5px) scale(0.8) !important;
  }

  .MuiInput-underline:after {
    border-bottom-color: var(--color-white) !important;
  }

  .MuiInputBase-root:hover {
    border-bottom-color: var(--color-white) !important;
  }

  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid var(--color-white) !important;
  }
  .MuiInput-underline:before {
    border-bottom: 1px solid var(--color-white) !important;
  }
`;

const getTextFieldStyle = ({ color }) => {
  if (color === "secondary") return secondaryInputStyle;
  return primaryInputStyle;
};

export const StyledInputField = styled(TextField)`
  ${(props) => getTextFieldStyle(props)}
  .MuiInputBase-root {
    font-size: var(--font-md) !important;
  }
  .MuiFormLabel-root.Mui-error {
    color: #f44336 !important;
  }
  .MuiFormLabel-asterisk.Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline.Mui-error:after {
    transform: scaleX(1) !important;
    border-bottom-color: #f44336 !important;
  }
  .MuiFormHelperText-root.Mui-error {
    color: #f44336 !important;
  }
`;
