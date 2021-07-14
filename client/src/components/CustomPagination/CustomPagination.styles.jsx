import styled from "styled-components";
import { Pagination } from "@material-ui/lab";

export const StyledPagination = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem auto 2rem;

  & {
    .MuiPaginationItem-icon {
      font-size: var(--font-md-big) !important;
    }

    .MuiPaginationItem-root {
      font-size: var(--font-md) !important;
    }
  }
`;
