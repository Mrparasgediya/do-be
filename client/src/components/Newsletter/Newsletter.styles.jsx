import InputField from "components/InputField/InputField";
import styled from "styled-components";

export const NewsletterContainer = styled.div`
  height: 20vw;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 425px) {
    height: 20rem;
  }

  @media (max-width: 768px) {
    height: 18rem;
  }
`;

export const NewsletterImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0),
    rgba(0, 0, 0, 0.1) 100%
  );
`;

export const NewsletterContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 60%;
  @media (max-width: 425px) {
    max-width: 95%;
  }
  @media (max-width: 768px) {
    max-width: 80%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 75%;
  }
  @media (min-width: 1025px) and (max-width: 1440px) {
    max-width: 65%;
  }
`;

export const NewsletterForm = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-direction: column;
`;

export const NewsletterLabel = styled.label`
  width: 100%;
  color: white;
  font-size: var(--font-heading-lg);
  font-weight: 700;

  @media (max-width: 768px) {
    font-weight: 300;
    font-size: var(--font-md-big) !important;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: var(--font-lg) !important;
  }
`;

export const NewsletterInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;
`;

export const StyledNewsletterInputField = styled(InputField)`
  margin: 0;
`;
