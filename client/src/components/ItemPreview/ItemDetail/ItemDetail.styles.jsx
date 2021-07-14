import styled from "styled-components";

export const StyledDetailHeading = styled.h4`
  font-size: ${(props) =>
    props.isMainHeading ? "var(--font-md-big)" : "var(--font-md)"}!important;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`;

export const StyledDetailText = styled.p`
  font-size: var(--font-md);
  font-weight: 300;
  &:last-child {
    margin-bottom: 1.5rem;
  }
`;
