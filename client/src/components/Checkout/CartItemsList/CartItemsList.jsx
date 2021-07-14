import React from "react";
// styles
import * as S from "./CartItemsList.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setContactDetails } from "redux/checkout/checkout.actions";
import { selectContactDetails } from "redux/checkout/checkout.selectors";
import { selectCurrentUserName } from "redux/user/user.selectors";
// components
import CartItem from "../CartItem/CartItem";
import NavigationButtons from "../NavigationButtons/NavigationButtons";

function CartItemsList({
  currentUserName,
  setContactDetails,
  onNextClick,
  onGoBackClick,
  cartItems,
  contactDetails,
}) {
  const nextClickHandler = () => {
    if (currentUserName && !contactDetails.name) {
      setContactDetails({ ...contactDetails, name: currentUserName });
    }
    onNextClick();
  };
  return (
    <S.StyledCartItemsListContainer>
      {Object.keys(cartItems).map((cartItemId) => (
        <CartItem
          key={cartItemId}
          item={{ id: cartItemId, ...cartItems[cartItemId] }}
        />
      ))}
      <NavigationButtons
        onNextClick={nextClickHandler}
        onGoBackClick={onGoBackClick}
        disableNextButton={Object.keys(cartItems).length === 0}
      />
    </S.StyledCartItemsListContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUserName: selectCurrentUserName,
  contactDetails: selectContactDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setContactDetails: (contactDetails) =>
    dispatch(setContactDetails(contactDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItemsList);
