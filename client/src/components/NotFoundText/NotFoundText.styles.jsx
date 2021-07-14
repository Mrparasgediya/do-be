import styled, { css } from "styled-components";

const centerTextStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledNotFoundText = styled.h4`
  font-size: var(--font-md-big) !important;
  text-transform: capitalize;
  font-family: var(--font-family-body) !important;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  ${(props) => props.center && centerTextStyle};
`;
