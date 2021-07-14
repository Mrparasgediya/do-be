import styled, { css, keyframes } from "styled-components";

const fillAnimation = keyframes`
 0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }`;

export const ProgressDotContainer = styled.div`
  position: relative;
`;
const filledProgressDotStyle = css`
  &::before {
    animation: ${fillAnimation} 0.8s var(--cubic-bazier-function);
    animation-fill-mode: forwards;
    animation-delay: 0.8s;
  }
`;
export const ProgressDot = styled.div`
  border: 2px solid var(--color-pink);
  height: 40px;
  width: 40px;
  background-color: var(--color-white);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-pink);
    transition: width 0.3s;
    width: 0%;
  }
  &::after {
    border: 2px solid var(--color-pink);
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-white);
    z-index: 1;
    height: 50%;
    width: 50%;
    border-radius: 50%;
  }
  ${(props) => props.isfilled && filledProgressDotStyle}
`;
const filledProgressDotInfoStyle = css`
  color: var(--color-pink);
`;
export const ProgressDotInfo = styled.b`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: -20px;
  text-transform: uppercase;
  font-size: 1.2rem;
  width: max-content;
  color: var(--color-gray-border);
  transition: color 0.3s ease-in-out;
  ${(props) => props.isfilled && filledProgressDotInfoStyle}
`;

const filledProgressDotLineStyle = css`
  &::before {
    animation: ${fillAnimation} 0.8s var(--cubic-bazier-function);
    animation-fill-mode: forwards;
  }
`;

export const ProgressDotLine = styled.div`
  height: 10px;
  width: 40px;
  border-top: 2px solid var(--color-pink);
  border-bottom: 2px solid var(--color-pink);
  background-color: var(--color-white);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    width: 0%;
    background-color: var(--color-pink);
  }

  ${(props) => props.isfilled && filledProgressDotLineStyle}
`;
