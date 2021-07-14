import React from "react";
// styles
import * as S from "./ProfileItemInput.styles";
// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "redux/user/user.selectors";
// components
import CustomButton from "components/CustomButton/CustomButton";
import InputField from "components/InputField/InputField";

function ProfileItemInput({
  currentUser,
  displayText,
  buttonText,
  handleClick,
  hasForm,
  handleFormSubmit,
  handleInputChange,
  disabledButton,
  toggleInput,
  setToggleInput,
  displayButtonCondition,
}) {
  let profileItemInfo = null;

  if (hasForm) {
    profileItemInfo = (
      <S.ProfileItemInputForm onSubmit={handleFormSubmit}>
        {toggleInput ? (
          <InputField
            value={displayText || ""}
            onChange={handleInputChange}
            type={"text"}
            required
          />
        ) : (
          displayText || <span>&#8212;</span>
        )}
        <CustomButton
          color="pink"
          size="xs"
          isActive
          type={toggleInput ? "button" : "submit"}
          onClick={setToggleInput}
          disabled={disabledButton}
        >
          {buttonText}
        </CustomButton>
      </S.ProfileItemInputForm>
    );
  } else {
    profileItemInfo = (
      <S.ProfileItemInfoContainer>
        <p>{displayText}</p>
        {displayButtonCondition === undefined ? (
          <S.StyledProfileItemInputCustomButton
            color="pink"
            size="xs"
            isActive
            onClick={handleClick}
            disabled={disabledButton}
          >
            {buttonText}
          </S.StyledProfileItemInputCustomButton>
        ) : (
          !displayButtonCondition && (
            <S.StyledProfileItemInputCustomButton
              color="pink"
              size="xs"
              isActive
              onClick={handleClick}
              disabled={disabledButton}
            >
              {buttonText}
            </S.StyledProfileItemInputCustomButton>
          )
        )}
      </S.ProfileItemInfoContainer>
    );
  }

  return currentUser ? profileItemInfo : <span>&#8212;</span>;
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(ProfileItemInput);
