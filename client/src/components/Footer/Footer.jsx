import React from "react";
// styles
import * as S from "./Footer.styles";
// static data
import content from "./content.js";
// components
import FooterList from "./FooterList/FooterList";

function Footer() {
  return (
    <S.StyledFooter>
      <S.FooterContainer container justify={"center"}>
        {content.map((list, idx) => (
          <S.FooterListContainer item lg={3} md={3} sm={4} xs={6} key={idx}>
            <FooterList footerList={list} />
          </S.FooterListContainer>
        ))}
      </S.FooterContainer>
    </S.StyledFooter>
  );
}

export default Footer;
