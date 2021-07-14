import styled, { css, keyframes } from "styled-components";
import { ReactComponent as FacebookIcon } from "../../../assets/icons/social/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/icons/social/twitter.svg";
import { ReactComponent as InstagramIcon } from "../../../assets/icons/social/instagram.svg";

const fadeIconsOut = keyframes` 
  0% {
    left: 4rem;
  }

  100% {
    opacity: 0;
    left: 0rem;
  }
`;

const fadeIconsIn = keyframes`
  0% {
    opacity: 0;
    left: 0rem;
  }

  100% {
    left: 4rem;
  }
`;

const displayIconStyle = css`
  animation: ${fadeIconsIn} 1s;
`;
const hideIconStyle = css`
  animation: ${fadeIconsOut} 1s;
  animation-fill-mode: forwards;
`;

export const SocialIconsContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 4rem;
  transform: translateY(-50%);
  height: 70rem;
  max-height: 80%;
  width: 4rem;
  animation-delay: 0.5s;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${(props) => (props.displayIcon ? displayIconStyle : hideIconStyle)}

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LineIcon = styled.div`
  width: 0.5rem;
  border-radius: 5rem;
  background-color: var(--color-white);
  height: 20rem;
`;

const socialIconsStyle = css`
  height: 4rem;
  width: 4rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  fill: var(--color-white);

  &:hover {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    height: 3rem;
    width: 3rem;
  }
`;

export const StyledFacebookIcon = styled(FacebookIcon)`
  ${socialIconsStyle}
  &:hover {
    fill: var(--color-facebook);
  }
`;

export const StyledTwitterIcon = styled(TwitterIcon)`
  ${socialIconsStyle}
  &:hover {
    fill: var(--color-twitter);
  }
`;
export const StyledInstagramIcon = styled(InstagramIcon)`
  ${socialIconsStyle}
  &:hover {
    fill: var(--color-instagram);
  }
`;
