import React from "react";
// styles
import * as S from "./ProfileItemsList.styles";
// components
import ProfileItem from "../ProfileItem/ProfileItem";

function ProfileItemsList() {
  return (
    <S.ProfileItemsListContainer container alignItems="center">
      <ProfileItem heading="name" isNameItem />
      <ProfileItem heading="email" isEmailItem />
      <ProfileItem heading="is your email verified?" isEmailVerifyItem />
      <ProfileItem heading="Your address details" isAddressDetailsItem />
      <ProfileItem heading="Phone Number" isPhoneNumberItem />
    </S.ProfileItemsListContainer>
  );
}

export default ProfileItemsList;
