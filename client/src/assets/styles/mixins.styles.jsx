import { css } from "styled-components";

export const glassEffect = (color) => {
  if (color === "black") {
    return css`
      background: rgba(0, 0, 0, 0.8) !important;
      backdrop-filter: blur(1rem);
      -webkit-backdrop-filter: blur(1rem);
      box-shadow: 0 0.8rem 3.2rem 0 rgba(31, 38, 135, 0.37);
    `;
  }
  if (color === "white") {
    return css`
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(0.5rem);
      -webkit-backdrop-filter: blur(0.5rem);
      border-radius: 1rem;
    `;
  }

  if (color === "red") {
    return css`
      background: rgba(255, 6, 6, 0.5);
      box-shadow: 0 0.8rem 3.2rem 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(0.5rem);
      -webkit-backdrop-filter: blur(0.5rem);
      border-radius: 1rem;
    `;
  }
  if (color === "pink") {
    return css`
      background: rgba(222, 33, 114, 0.15) !important;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
    `;
  }
  if (color === "darkPink") {
    return css`
      background: rgba(222, 33, 114, 0.7) !important;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    `;
  }
};
