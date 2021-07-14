import styled, { css } from "styled-components";

const defaultPriceInfoStyle = css`
  margin: 1rem 0;
  padding: 0rem 1.5rem;
  font-size: var(--font-md);
  display: flex;
  justify-content: space-between;

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 0;
  }
`;

export const DefaultPriceInfoContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  @media (min-width: 426px) and (max-width: 768px) {
    width: 60%;
  }

  @media (max-width: 425px) {
    width: 75%;
  }
`;

export const DefaultPriceHeading = styled.h4`
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;
export const DefaultPriceHeadingQty = styled.span`
  color: var(--color-gray-light);
`;

export const DefaultPriceInfo = styled.div`
  ${defaultPriceInfoStyle}
  font-weight: ${(props) => (props.hasBoldFont ? "700" : "400")};
  color: var(--color-black);
`;

export const DefaultPriceInfoDiscount = styled.div`
  ${defaultPriceInfoStyle}
  position:relative;
  color: var(--color-green);

  &:before {
    content: "";
    height: 1px;
    width: 8px;
    background-color: var(--color-black);
    position: absolute;
    top: -30%;
    left: -5%;
    font-size: var(--font-md);
  }

  @media (max-width: 768px) {
    &:before {
    }
  }
`;

export const DefaultPriceInfoLine = styled.div`
  border: 0.5px solid #dcdcdc;
`;

export const DefaultPriceNaNPriceMessage = styled.b`
  font-size: var(--font-sm);
  color: var(--color-red);
`;
