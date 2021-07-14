import styled, { css } from "styled-components";

const darkFontStyle = css`
  font-weight: 700 !important;
  letter-spacing: 1px;
  text-transform: capitalize;
`;

export const StyledTable = styled.table`
  max-width: 1440px;
  width: 100%;
  font-size: var(--font-sm);
  border-collapse: collapse;
  border-spacing: 0 1.2rem;
  margin: 0 auto;
  ${(props) => props.hasDarkFonts && darkFontStyle};
`;

export const StyledTableData = styled.td`
  text-align: center;
  padding: 1rem !important;
  width: max-content;
  min-width: ${({ defaultWidth }) => (defaultWidth ? defaultWidth : "auto")};
`;
export const StyledTableRow = styled.tr`
  border-bottom: 1px solid var(--color-gray-light);
`;

export const StyledImage = styled.img`
  height: 100px;
  width: 150px;
  object-fit: contain;
`;
