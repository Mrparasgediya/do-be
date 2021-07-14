import * as S from "./CustomTable.styles";

export const Table = ({ children, hasDarkFonts, ...otherProps }) => (
  <S.StyledTable hasDarkFonts={hasDarkFonts} {...otherProps}>
    {children}
  </S.StyledTable>
);
export const TableHead = ({ children, ...otherProps }) => (
  <thead {...otherProps}>{children}</thead>
);
export const TableBody = ({ children, ...otherProps }) => (
  <tbody {...otherProps}>{children}</tbody>
);

export const TableRow = ({ children }) => (
  <S.StyledTableRow>{children}</S.StyledTableRow>
);

export const TableData = ({
  children,
  defaultWidth,
  hasImage,
  src,
  alt,
  ...otherProps
}) => (
  <S.StyledTableData defaultWidth={defaultWidth} {...otherProps}>
    {hasImage ? <S.StyledImage src={src} alt={alt} /> : children}
  </S.StyledTableData>
);
