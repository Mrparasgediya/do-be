import { Paper } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import styled from "styled-components";

export const StyledAutoComplete = styled(Autocomplete)`
  width: "300px";
`;

export const StyledPaper = styled(Paper)`
  font-size: var(--font-md);
  text-transform: capitalize;
`;
