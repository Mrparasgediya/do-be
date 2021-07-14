import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
// style
import * as S from "./ProfileAndOrders.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomContainer from "components/CustomContainer/CustomContainer";
import CustomButton from "components/CustomButton/CustomButton";
import Profile from "components/Profile/Profile";
import Orders from "components/Orders/Orders";
// utils
import { auth } from "firebase/firebase.utils";
import { scrollWindowToTop } from "utils/app.utils";
import { selectUnSubscribeUserOrdersMethod } from "redux/user/orders/orders.selectors";
import { logoutUser } from "utils/user.utils";

function ProfileAndOrders({
  currentUser,
  match: { params },
  showNotification,
  unSubscribeUserOrdersMethod,
  logoutUser,
}) {
  const [currentWindow, setCurrentWindow] = useState(params.profileOrOrders);

  useEffect(() => {
    scrollWindowToTop();
  }, []);

  useEffect(() => {
    setCurrentWindow(params.profileOrOrders);
  }, [params.profileOrOrders]);

  return (
    <CustomContainer>
      <S.ProfileAndOrdersContainer>
        <S.ProfileAndOrdersHeader>
          <S.ProfileAndOrdersHeaderHeading>
            Hello,
            <S.ProfileAndOrdersHeaderHeadingGreetingText>
              {(currentUser && currentUser.name) || "User"}
            </S.ProfileAndOrdersHeaderHeadingGreetingText>
          </S.ProfileAndOrdersHeaderHeading>
          <CustomButton
            color="black"
            size="small"
            onClick={async () => {
              try {
                const [_, error] = await logoutUser(
                  unSubscribeUserOrdersMethod
                );
                if (error) throw new Error(error);
                showNotification("You have logged out succesfully.", "success");
              } catch (error) {
                showNotification(error.message, "error");
              }
            }}
          >
            Log out
          </CustomButton>
        </S.ProfileAndOrdersHeader>

        <S.ProfileAndOrdersSelectWindowList>
          <S.ProfileAndOrdersSelectWindowListItem>
            <Link to="/user/profile">
              <S.StyledProfileAndOrdersLinkText
                isSelected={currentWindow === "profile"}
              >
                Profile
              </S.StyledProfileAndOrdersLinkText>
            </Link>
          </S.ProfileAndOrdersSelectWindowListItem>
          <S.ProfileAndOrdersSelectWindowListItem>
            <Link to="/user/orders">
              <S.StyledProfileAndOrdersLinkText
                isSelected={currentWindow === "orders"}
              >
                Orders
              </S.StyledProfileAndOrdersLinkText>
            </Link>
          </S.ProfileAndOrdersSelectWindowListItem>
        </S.ProfileAndOrdersSelectWindowList>
        {currentWindow === "profile" ? <Profile /> : <Orders />}
      </S.ProfileAndOrdersContainer>
    </CustomContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  unSubscribeUserOrdersMethod: selectUnSubscribeUserOrdersMethod,
});

const mapDispatchToProps = (dispatch) => ({
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  logoutUser: (unSubscribeUserOrdersMethod) =>
    logoutUser(dispatch, unSubscribeUserOrdersMethod),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileAndOrders));
