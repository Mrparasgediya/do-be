import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledListIconForm = styled.form`
  display: flex;
  alignitems: center;
  position: relative;
  transition: all 0.4s;
  .MuiFormLabel-root {
    font-size: var(--font-sm) !important;
  }
`;

export const ProfileIconContainer = styled.span`
  position: relative;
`;

export const StyledListIconName = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledListIconLink = styled(Link)`
  border: none !important;
  padding: 0 !important;
`;
