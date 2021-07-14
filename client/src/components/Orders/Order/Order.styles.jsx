import { Grid } from "@material-ui/core";
import CustomButton from "components/CustomButton/CustomButton";
import styled, { css } from "styled-components";

const fullfilledAndCancelledOrderStatusStyles = css`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 0.5rem !important;
  }
`;

const pendingOrderStatusStyles = css`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const getStatusContainerStyles = ({ status }) => {
  if (status === "fulfilled" || status === "cancelled")
    return fullfilledAndCancelledOrderStatusStyles;
  if (status === "pending") return pendingOrderStatusStyles;
};

export const OrderStatusContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  ${(props) => getStatusContainerStyles(props)}
`;

const getOrderStatusTextColor = ({ color }) => {
  if (color === "green") return "var(--color-green)";
  if (color === "red") return "var(--color-red)";
  if (color === "gray") return "var(--color-gray-light)";
  if (color === "skyblue") return "var(--color-skyblue-light)";
  return "var(--color-black)";
};

export const OrderStautsText = styled.span`
  color: ${(props) => getOrderStatusTextColor(props)};
`;

export const StyledOrderStatusPendingCustomButton = styled(CustomButton)`
  margin: 0;
  margin-right: 2rem;
  flex-basis: 25%;
  flex-shrink: 0;
  @media (max-width: 768px) {
    margin: 0 !important;
    flex: 0.4;
  }
`;

export const OrderStatusOrderIdHeading = styled.h4`
  font-size: var(--font-md);
`;

export const OrderStatusPaymentModeHeading = styled.h5`
  font-size: var(--font-md);
  font-family: var(--font-family-body);
  text-transform: capitalize;
`;

export const OrderStatusItemsContainer = styled(Grid)``;

export const OrderStatusInfoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  font-size: var(--font-md);
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 0.5rem !important;
  }
`;

export const OrderStatusHeading = styled.h5`
  font-family: var(--font-family-body);
  width: max-content;
  font-size: var(--font-md);
`;

export const OrderContainer = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  padding: 1rem 2rem;
  border: 1px solid var(--color-gray-image);
  font-size: var(--font-md);
  transition: transform 0.3s ease-in-out;

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
    box-shadow: var(--shadow-default);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
  @media (min-width: 769px) {
    width: 80%;
    transform: scale(0.98);

    &:hover {
      transform: translateY(-0.5rem) scale(1);

      &::after {
        box-shadow: var(--shadow-hover);
      }
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }
  }

  @media (max-width: 768px) {
    &:active {
      transform: scale(0.97);
      &::after {
        box-shadow: none;
      }
    }
  }
`;
