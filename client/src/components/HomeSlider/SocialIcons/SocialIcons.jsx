import React, { useEffect, useState } from "react";
// styles
import * as S from "./SocialIcons.styles";

const SocialIcons = () => {
  const [displayIcons, setDisplayIcons] = useState(true);

  let handleScroll = () => {
    if (window.scrollY < 276) {
      setDisplayIcons(true);
    } else {
      setDisplayIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <S.SocialIconsContainer displayIcon={displayIcons}>
      <S.LineIcon />
      <S.StyledFacebookIcon />
      <S.StyledTwitterIcon />
      <S.StyledInstagramIcon />
      <S.LineIcon />
    </S.SocialIconsContainer>
  );
};

export default SocialIcons;
