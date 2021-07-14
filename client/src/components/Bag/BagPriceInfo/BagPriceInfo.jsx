import React, { useState } from "react";
import { withRouter } from "react-router";
// styles
import * as S from "./BagPriceInfo.styles";
// redux
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectBagItemsToDisplay,
  selectIsValidOrder,
  selectTotalPriceDetails,
} from "redux/user/bag/bag.selectors";
import { setCheckoutCartItems } from "redux/checkout/checkout.actions";
import {
  selectCurrentUserIsEmailVerified,
  selectCurrentUserPhoneNumber,
} from "redux/user/user.selectors";
import { showNotification } from "redux/notification/notification.actions";
// components
import { Grid } from "@material-ui/core";
import CustomButton from "components/CustomButton/CustomButton";
import DefaultPriceInfo from "./DefaultPriceInfo/DefaultPriceInfo";

function BagPriceInfo({
  totalPriceDetails,
  isValidOrder,
  history,
  bagItems,
  setCheckoutCartItems,
  currentUserPhoneNo,
  currentUserIsEmailVerified,
  showNotification,
}) {
  const [toggleDetails, setToggleDetails] = useState(false);
  const isSmallScreen = window.screen.width < 769 ? true : false;

  const placeOrderHandler = () => {
    if (currentUserPhoneNo && currentUserIsEmailVerified) {
      // ready to go
      setCheckoutCartItems(bagItems);
      history.push("/checkout/items");
    } else {
      if (!currentUserIsEmailVerified && !currentUserPhoneNo) {
        showNotification(
          "verify email and phone number to place order",
          "info"
        );
      } else {
        if (!currentUserIsEmailVerified) {
          showNotification("verify email to place order", "info");
        } else {
          showNotification("verify phone number to place order", "info");
        }
      }
    }
  };

  return isSmallScreen ? (
    <S.SmallScreenBagPriceInfoContainer
      style={{ paddingTop: toggleDetails ? "1.5rem" : "0" }}
    >
      {toggleDetails && (
        <DefaultPriceInfo
          totalMRP={totalPriceDetails.MRP}
          totalDiscount={totalPriceDetails.discountMRP}
          noOfItems={totalPriceDetails.noOfItems}
          finalPrice={totalPriceDetails.finalMRP}
        />
      )}

      <S.SmallScreenBagPriceDetailsContainer>
        <div>
          <S.SmallScreenBagPriceDetails>
            <S.SmallScreenBagPriceDetailsText>
              Order Price
            </S.SmallScreenBagPriceDetailsText>
            <span>₹{totalPriceDetails.finalMRP}</span>
          </S.SmallScreenBagPriceDetails>
          <S.SmallScreenBagPriceDetailsViewMoreText
            onClick={() => setToggleDetails(!toggleDetails)}
          >
            View Details
          </S.SmallScreenBagPriceDetailsViewMoreText>
        </div>
        <CustomButton
          color="pink"
          onClick={() => {
            if (toggleDetails) {
              setToggleDetails(false);
            }
            placeOrderHandler();
          }}
          disabled={!isValidOrder}
        >
          Place Order
        </CustomButton>
      </S.SmallScreenBagPriceDetailsContainer>
    </S.SmallScreenBagPriceInfoContainer>
  ) : (
    <Grid item xlg={4} lg={4} md={4} sm={12} xs={12}>
      <S.LargeScreenBagPriceInfoContainer>
        <DefaultPriceInfo
          style={{ maxWidth: "80%", margin: 0 }}
          totalMRP={totalPriceDetails.MRP}
          totalDiscount={totalPriceDetails.discountMRP}
          noOfItems={totalPriceDetails.noOfItems}
          finalPrice={totalPriceDetails.finalMRP}
        />
        <CustomButton
          onClick={placeOrderHandler}
          style={{ margin: 0 }}
          disabled={!isValidOrder}
          color="pink"
          size="small"
        >
          Place Order
        </CustomButton>
      </S.LargeScreenBagPriceInfoContainer>
    </Grid>
  );
}
const mapStateToProps = createStructuredSelector({
  totalPriceDetails: selectTotalPriceDetails,
  isValidOrder: selectIsValidOrder,
  bagItems: selectBagItemsToDisplay,
  currentUserPhoneNo: selectCurrentUserPhoneNumber,
  currentUserIsEmailVerified: selectCurrentUserIsEmailVerified,
});

const mapDispatchToProps = (dispatch) => ({
  setCheckoutCartItems: (cartItems) =>
    dispatch(setCheckoutCartItems(cartItems)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BagPriceInfo));
