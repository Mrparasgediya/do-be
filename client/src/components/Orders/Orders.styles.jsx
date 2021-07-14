import styled from "styled-components";

export const OrdersContainer = styled.div`
  position: relative;
  text-align: ${(props) => (props.aligntextcenter ? "center" : "unset")};
  width: 100%;
  padding: 1rem 0 3rem;
`;

export const OrdersNotPlaced = styled.b`
  text-transform: capitalize;
  font-size: var(--font-md);
`;
