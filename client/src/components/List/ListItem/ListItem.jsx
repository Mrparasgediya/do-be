import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
// styles
import * as S from "./ListItem.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import { showNotification } from "redux/notification/notification.actions";
// components
import ListIcon from "../ListIcon/ListIcon";
import MenuList from "../MenuList/MenuList";
// utils
import { auth } from "firebase/firebase.utils";
import { selectUnSubscribeUserOrdersMethod } from "redux/user/orders/orders.selectors";
import { logoutUser } from "utils/user.utils";

function ListItem({
  hasIcon,
  hideIcon,
  menuItem,
  iconComponent: Icon,
  name,
  menu,
  linkUrl,
  hasNavMenu,
  isGreetingText,
  currentUser,
  handleMenuItemClick,
  isLogoutItem,
  history,
  listItemType,
  isCollectionList,
  showNotification,
  logoutUser,
  unSubscribeUserOrdersMethod,
  ...otherProps
}) {
  const [toggleNavMenu, setToggleNavMenu] = useState(false);

  let listItem = undefined;

  if (hasIcon) {
    listItem = (
      <ListIcon
        menu={menu}
        name={name}
        linkUrl={linkUrl}
        iconComponent={Icon}
        {...otherProps}
      />
    );
  }

  if (hasNavMenu) {
    listItem = (
      <S.NavMenuListitemContainer>
        <S.NavMenuListItem
          onMouseOver={() => setToggleNavMenu(!toggleNavMenu)}
          onMouseOut={() => setToggleNavMenu(!toggleNavMenu)}
        >
          {name}
        </S.NavMenuListItem>

        <MenuList
          menuType="navMenu"
          name={name}
          isCollectionList={isCollectionList}
          menu={menu}
          toggleMenu={toggleNavMenu}
          handleMenuItemClick={() => setToggleNavMenu(false)}
          handleMouseOver={() => setToggleNavMenu(true)}
          handleMouseOut={() => setToggleNavMenu(false)}
        />
      </S.NavMenuListitemContainer>
    );
  }

  if (menuItem) {
    listItem = null;

    if (currentUser) {
      if (
        otherProps.isUserLoggedInListItem ||
        otherProps.isUserLoggedInListItem === undefined
      ) {
        listItem = isLogoutItem ? (
          <Link
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
            to={linkUrl}
          >
            {name}
          </Link>
        ) : (
          <Link onClick={handleMenuItemClick} to={linkUrl}>
            {isGreetingText
              ? `${name}, ${(currentUser && currentUser.name) || "User"}`
              : name}
          </Link>
        );
      }
    } else {
      if (
        !otherProps.isUserLoggedInListItem ||
        otherProps.isUserLoggedInListItem === undefined
      ) {
        listItem = (
          <Link onClick={handleMenuItemClick} to={linkUrl}>
            {name}
          </Link>
        );
      }
    }
  }

  if (listItem === undefined) {
    listItem = <Link to={linkUrl}>{name}</Link>;
  }
  return (
    listItem && (
      <S.ListItem listItemType={listItemType} hideIcon={hideIcon}>
        {listItem}
      </S.ListItem>
    )
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
)(withRouter(ListItem));
