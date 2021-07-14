import styled from "styled-components";

export const OrderItemContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  cursor: pointer;
  border: 1px solid var(--color-gray-image);
  border-radius: 10px;
  position: relative;
  flex: 0.48 0 min-max(100%, 300px);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 1rem;
    transition: box-shadow 0.3s ease-in-out;
  }
  &:hover::after {
    box-shadow: var(--shadow-default);
  }
`;

export const OrderItemImage = styled.img`
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  object-fit: cover;
  width: 25%;
`;

export const OrderItemContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 2.5%;
`;

export const OrderItemContentHeading = styled.h4`
  display: flex;
  align-items: center;
`;
export const OrderItemPrice = styled.span`
  margin-left: 1.5rem;
`;
export const OrderItemBrandAndNameContainer = styled.span`
  flex: 1;
`;

export const OrderItemBrand = styled.div`
  text-transform: uppercase;
`;
export const OrderItemName = styled.div`
  font-weight: 400;
  text-transform: capitalize;
`;

export const OrderItemPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const OrderItemMRP = styled.span`
  font-size: var(--font-sm);
  text-decoration: line-through;
  font-weight: 300;
  color: var(--color-gray);
`;

export const OrderItemDiscount = styled.span`
  font-size: var(--font-sm);
  color: var(--color-pink);
  margin-left: 0.8rem;
`;

export const OrderItemSizeAndQtyContainer = styled.div`
  display: flex;
  font-size: var(--font-md);
  height: 2.8rem;
  margin: 1rem 0;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
`;

export const OrderIdContainer = styled.div`
  font-size: var(--font-md);
  cursor: auto;
`;
