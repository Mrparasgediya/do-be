import styled from "styled-components";
import CustomContainer from "components/CustomContainer/CustomContainer";

export const StyledContactUsCustomContainer = styled(CustomContainer)`
  height: 75vh;
  display: flex;
  margin-bottom: 15rem;
  @media (max-width: 768px) {
    padding: 3rem 0;
    height: 60vh;
  }
`;

export const ContactUsLabel = styled.label`
  font-size: var(--font-md);
`;

export const ContactUsDescriptionInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1.2rem;
`;

export const ContactUsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
  justify-content: flex-start;
  margin: 3rem auto 0;
`;

export const ContactUsHeading = styled.h2`
  text-align: center;
  font-family: var(--font-family-body);
`;

export const ContactUsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
