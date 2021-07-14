import { Container, Grid } from "@material-ui/core";
import styled from "styled-components";

export const StyledAboutUsContainer = styled(Container)`
  margin-top: 12rem;
  margin-bottom: 3rem;
  min-height: 75vh;
`;

export const StyledAboutUsGridImage = styled(Grid)`
  position: relative;
  height: ${window.innerWidth > 768 ? "62rem" : "48rem"};
`;

export const AboutUsBrandLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: ${window.innerWidth > 768 ? "200px" : "150px"};
  width: ${window.innerWidth > 768 ? "200px" : "150px"};
`;

export const AboutUsHeading = styled.h2`
  font-family: var(--font-family-body);
  margin-bottom: 1.2rem;
`;

export const AboutUsDescription = styled.p`
  font-size: var(--font-md);
  letter-spacing: 0.5px;
`;
