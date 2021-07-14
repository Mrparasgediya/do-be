import { Container } from "@material-ui/core";
import styled from "styled-components";

export const StyledHomeSliderContainer = styled(Container)`
  height: 100vh;
  width: 100%;
  position: relative;

  transition: all 0.3s ease-in-out;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: content-box;
  color: var(--color-white);
  padding: 0;
`;

export const StyledHomeSliderSlide = styled.div`
  height: 100%;
  width: 100%;
`;
