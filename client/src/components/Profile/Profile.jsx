import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import * as S from "./Profile.styles";

import { toggleDeleteUserDialog } from "redux/user/user.actions";
import { selectIsOperationRunning } from "redux/user/user.selectors";

import ProfileItemsList from "./ProfileItemsList/ProfileItemsList";
import CustomButton from "components/CustomButton/CustomButton";
import DeleteUserDialog from "./DeleteUserDialog/DeleteUserDialog";

const Profile = ({ isOperationRunning, toggleDeleteUserDialog }) => {
  return (
    <S.ProfileContainer>
      <S.ProfileHeading>Profile info</S.ProfileHeading>
      <S.ProfileContentContainer>
        <ProfileItemsList />
        <S.ProfileButtonsContainer>
          <Link to="/user/change/password">
            <CustomButton
              color="pink"
              size="xs"
              isActive
              disabled={isOperationRunning}
            >
              change password
            </CustomButton>
          </Link>
          <CustomButton
            color="pink"
            size="xs"
            isActive
            disabled={isOperationRunning}
            onClick={toggleDeleteUserDialog}
          >
            delete account
          </CustomButton>
        </S.ProfileButtonsContainer>
        <DeleteUserDialog />
      </S.ProfileContentContainer>
    </S.ProfileContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDeleteUserDialog: () => dispatch(toggleDeleteUserDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
