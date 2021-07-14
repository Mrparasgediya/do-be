import styled from "styled-components";

export const CartItemContainer = styled.div`
  height: 22rem;
  width: 100%;
  display: flex;
  border-radius: 10px;
  box-shadow: var(--shadow-default);
`;

export const CartItemImageContainer = styled.div`
  flex: 0.4;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const CartItemInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0 1rem;
`;

export const CartItemBrandAndNameContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CartItemName = styled.p`
  font-weight: 400;
  text-transform: capitalize;
  flex: 1;
  max-width: 100%;
  font-size: var(--font-md);
`;

export const CartItemBrand = styled.h4`
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const CartItemPriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
`;

export const CartItemMRPAndDiscountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--font-sm);
`;

export const CartItemMRP = styled.span`
  text-decoration: line-through;
  color: var(--color-gray-border);
`;
export const CartItemDiscount = styled.span`
  color: var(--color-green);
`;

export const CartItemSizeAndQtyContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const CartItemTotalContainer = styled.h4`
  width: min-content;
  text-transform: capitalize;
  margin-left: 2rem;
`;

export const CartItemTotalDiscountInfo = styled.div`
  color: var(--color-green);
  position: relative;
  &::before {
    position: absolute;
    top: 25%;
    transform: translateY(-50%);
    left: -15px;
    content: "-";
    font-size: 2rem;
  }
`;

export const StyledCartItemHr = styled.hr`
  width: 20rem;
`;
