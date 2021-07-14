import CustomButton from "components/CustomButton/CustomButton";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import styled, { css } from "styled-components";

export const StripePayNoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: var(--font-md);
  text-transform: uppercase;
  color: var(--color-red);
  gap: 0.5rem;
  margin-top: 2rem;
  aligni-tems: flex-start;
`;

export const StripePaySmallText = styled.span`
  font-size: var(--font-sm);
`;

export const StyledStripePayLoadingSpinner = styled(LoadingSpinner)`
  @media (max-width: 768px) {
    margin-top: 3rem;
  }
`;

export const StyledStripePayButton = styled(CustomButton)`
  width: 80%;
  border-radius: 10px;
  min-height: 50px;
  font-size: var(--font-md);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: var(--shadow-default);
  text-transform: capitalize;
  @media (max-width: 768px) {
    min-width: 75%;
  }
`;

const stripePayDisplayCardFormStyle = css`
  transform: translateX(0);
  visibility: visible;
  opacity: 1;
`;

export const StripePayCardForm = styled.form`
  width: 400px;
  transition: transform 0.3s var(--cubic-bazier-function), opacity 0.3s ease-in;
  transform: translate(30px, 30px);
  visibility: hidden;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  min-width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
  ${(props) => props.displayform && stripePayDisplayCardFormStyle}
`;

export const StripePayCardElementContainer = styled.div`
  box-shadow: var(--shadow-default);
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
`;
