import React, { Fragment } from "react";
// styles
import * as S from "./ProfileItem.styles";
// components
import ProfileItemVerifyEmail from "../ProfileItems/ProfileItemVerifyEmail/ProfileItemVerifyEmail";
import ChangeName from "../ProfileItems/ChangeName/ChangeName";
import ProfileItemEmail from "../ProfileItems/ProfileItemEmail/ProfileItemEmail";
import AddressDetails from "../ProfileItems/AddressDetails/AddressDetails";
import PhoneNumber from "../ProfileItems/PhoneNumber/PhoneNumber";

function ProfileItem({
  heading,
  isEmailItem,
  isNameItem,
  isEmailVerifyItem,
  isAddressDetailsItem,
  isPhoneNumberItem,
}) {
  return (
    <Fragment>
      <S.ProfileItemHeadingContainer item md={6} sm={12} xs={12}>
        <S.ProfileItemName>{heading}</S.ProfileItemName>
      </S.ProfileItemHeadingContainer>
      <S.ProfileItemInfoContainer item md={6} sm={12} xs={12}>
        {isEmailItem && <ProfileItemEmail />}
        {isNameItem && <ChangeName />}
        {isEmailVerifyItem && <ProfileItemVerifyEmail />}
        {isAddressDetailsItem && <AddressDetails />}
        {isPhoneNumberItem && <PhoneNumber />}
      </S.ProfileItemInfoContainer>
    </Fragment>
  );
}

export default ProfileItem;
