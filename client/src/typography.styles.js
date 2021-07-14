import { css } from "styled-components";

const typographyStyle = css`
  :is(h1, h2, h3, h4, h5) {
    font-family: "Jenriv";
  }

  h1 {
    font-size: 6.5rem;
  }

  h2 {
    font-size: 4rem;
  }

  h3 {
    font-size: 3rem;
  }

  h4 {
    font-size: 1.5rem;
    font-family: "Gontserrat";
  }

  @media (max-width: 425px) {
    h1 {
      font-size: 4rem;
    }
    h2 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 1.8rem;
    }
  }

  @media (min-width: 425px) and (max-width: 768px) {
    h1 {
      font-size: 4.5rem;
    }

    h2 {
      font-size: 3rem;
    }

    h3 {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    h1 {
      font-size: 5rem;
    }

    h2 {
      font-size: 3.5rem;
    }

    h3 {
      font-size: 2.5rem;
    }
  }

  @media (min-width: 1024px) and (max-width: 1440px) {
    h1 {
      font-size: 5.5rem;
    }

    h2 {
      font-size: 3.8rem;
    }

    h3 {
      font-size: 2.5rem;
    }
  }
`;

export default typographyStyle;
