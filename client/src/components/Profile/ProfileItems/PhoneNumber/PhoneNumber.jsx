import React from "react";
import { Link } from "react-router-dom";
// styles
import * as S from "./PhoneNumber.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUserPhoneNumber,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
// components
import CustomButton from "components/CustomButton/CustomButton";

function PhoneNumber({ userPhoneNumber, isOperationRunning }) {
  return (
    <S.PhoneNumberContainer>
      {userPhoneNumber ? (
        <span>{userPhoneNumber.split("+91").join("+91 ")}</span>
      ) : (
        <span>&#8212;</span>
      )}
      <Link to="/user/change/phoneno">
        <CustomButton
          disabled={isOperationRunning}
          isActive
          size="xs"
          color="pink"
        >
          change Phone no
        </CustomButton>
      </Link>
    </S.PhoneNumberContainer>
  );
}
const mapStateToProps = createStructuredSelector({
  userPhoneNumber: selectCurrentUserPhoneNumber,
  isOperationRunning: selectIsOperationRunning,
});
export default connect(mapStateToProps)(PhoneNumber);
