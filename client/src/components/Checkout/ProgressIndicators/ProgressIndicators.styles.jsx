import styled from "styled-components";

export const ProgressIndicatorsContainer = styled.div`
  height: 50px;
  min-width: 25%;
  width: min-content;
  max-width: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  @media (max-width: 768px) {
    max-width: 75%;
    transform: scale(0.8);
  }
`;
