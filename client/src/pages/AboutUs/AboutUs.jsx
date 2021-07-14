import React, { useEffect } from "react";
// styles
import * as S from "./AboutUs.styles";
// assets
import logo from "../../assets/icons/navigation/brand.png";
// components
import { Grid } from "@material-ui/core";
import CustomImage from "components/CustomImage/CustomImage";
// utils
import { scrollWindowToTop } from "utils/app.utils";

function AboutUs() {
  useEffect(() => {
    scrollWindowToTop();
  }, []);

  return (
    <S.StyledAboutUsContainer maxWidth="lg">
      <Grid spacing="2" container>
        <S.StyledAboutUsGridImage item md={4} xs={12}>
          <CustomImage
            type="aboutUsImage"
            src="https://images.unsplash.com/photo-1578932750355-5eb30ece487a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&h=620&q=90"
            placeholderSrc="https://images.unsplash.com/photo-1578932750355-5eb30ece487a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=48&h=60&q=10"
          />
          <S.AboutUsBrandLogo src={logo} alt="logo" />
        </S.StyledAboutUsGridImage>
        <Grid md={6} xs={12} item>
          <S.AboutUsHeading>DO & BE</S.AboutUsHeading>
          <S.AboutUsDescription>
            Welcome to DO & BE Where fashion is the way of Life.
            <br />
            We the DO & BE team welcomes you on our e-commerce shopping platform
            where our aim is to provide best services and satisfaction to our
            customers. We have the best collections and brands that fullfill
            your requirement at best deal and gives you a very honorable
            experiance.
          </S.AboutUsDescription>
        </Grid>
      </Grid>
    </S.StyledAboutUsContainer>
  );
}

export default AboutUs;
