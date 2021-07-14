import styled from "styled-components";
import LottiePlayer from "react-lottie";

export const OrderStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OrderStatusHeading = styled.h3`
  font-family: var(--font-family-body);
  font-size: var(--font-md-big);
`;

export const StyledOrderStatusLottiePlayer = styled(LottiePlayer)`
  height: 300px;
  width: 300px;
  object-fit: contain;
  transform: translateX(15px);

  @media (max-width: 768px) {
    height: 75%;
    width: 75%;
  }
`;
