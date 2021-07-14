import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// styles
import * as S from "./MenuList.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import {
  selectCollectionForFilter,
  selectGroupForFilter,
  setSelectedGroupForFilter,
} from "redux/filter/filter.action";
import { showNotification } from "redux/notification/notification.actions";
// utils
import { auth } from "firebase/firebase.utils";
import { logoutUser } from "utils/user.utils";
import { selectUnSubscribeUserOrdersMethod } from "redux/user/orders/orders.selectors";

function MenuList({
  toggleMenu,
  menu,
  handleMenuItemClick,
  handleMouseOut,
  history,
  handleMouseOver,
  currentuser,
  menuType,
  isCollectionList,
  name,
  setSelectedGroupForFilter,
  selectCollectionForFilter,
  selectGroupForFilter,
  showNotification,
  logoutUser,
  unSubscribeUserOrdersMethod,
}) {
  return (
    <S.MenuListContainer
      menuType={menuType}
      toggleMenu={toggleMenu}
      onMouseOver={handleMouseOver || null}
      onMouseOut={handleMouseOut || null}
    >
      {menu.map((menuItem, idx) => {
        const menuListItem = (
          <S.MenuListItem
            menuType={menuType}
            key={idx}
            onClick={
              isCollectionList
                ? () => {
                    const groupName = name.toLowerCase();
                    setSelectedGroupForFilter(groupName);
                    selectGroupForFilter(groupName);
                    selectCollectionForFilter(menuItem.id);
                    handleMenuItemClick();
                    history.push("/search");
                  }
                : handleMenuItemClick
            }
          >
            {menuItem.linkUrl ? (
              <Link to={menuItem.linkUrl}>{menuItem.name}</Link>
            ) : (
              menuItem.name
            )}
          </S.MenuListItem>
        );
        return menuType === "profileMenu"
          ? menuItem.isUserLoggedInListItem
            ? currentuser && menuListItem
            : !currentuser && menuListItem
          : menuListItem;
      })}
      {menuType === "profileMenu" && currentuser && (
        <Fragment>
          {currentuser.role === "admin" && (
            <S.MenuListItem
              menuType="profileMenu"
              onClick={() => {
                handleMenuItemClick();
                history.push("/admin/home");
              }}
            >
              Admin Panel
            </S.MenuListItem>
          )}
          <S.MenuListItem
            menuType="profileMenu"
            onClick={async () => {
              try {
                const [_, error] = await logoutUser(
                  unSubscribeUserOrdersMethod
                );
                if (error) throw new Error(error);
                handleMenuItemClick();
                showNotification("You have logged out succesfully.", "success");
                history.push("/");
              } catch (error) {
                showNotification(error.message, "error");
              }
            }}
          >
            Logout
          </S.MenuListItem>
        </Fragment>
      )}
    </S.MenuListContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentuser: selectCurrentUser,
  unSubscribeUserOrdersMethod: selectUnSubscribeUserOrdersMethod,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedGroupForFilter: (group) =>
    dispatch(setSelectedGroupForFilter(group)),
  selectCollectionForFilter: (collectionId) =>
    dispatch(selectCollectionForFilter(collectionId)),
  selectGroupForFilter: (group) => dispatch(selectGroupForFilter(group)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
  logoutUser: (unSubscribeUserOrdersMethod) =>
    logoutUser(dispatch, unSubscribeUserOrdersMethod),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MenuList));
