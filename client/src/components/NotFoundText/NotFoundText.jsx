import CustomButton from "components/CustomButton/CustomButton";
import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./NotFoundText.styles";

function NotFoundText({ placeCenter, children, goBackUrl }) {
  const history = useHistory();
  return (
    <S.StyledNotFoundText center={placeCenter}>
      {children}
      {goBackUrl && (
        <CustomButton
          size="xs"
          color="black"
          isActive
          onClick={() => history.push(goBackUrl || "/")}
        >
          go back
        </CustomButton>
      )}
    </S.StyledNotFoundText>
  );
}

export default NotFoundText;
