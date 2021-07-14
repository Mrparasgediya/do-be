import React, { useEffect, useState, Fragment } from "react";
// styles
import * as S from "./AddressDetails.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUserAddress,
  selectCurrentUserId,
  selectIsOperationRunning,
} from "redux/user/user.selectors";
import {
  setCurrentUserAddress,
  toggleIsOperationRunning,
} from "redux/user/user.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "components/CustomButton/CustomButton";
import CustomDialog from "components/CustomDialog/CustomDialog";
import InputField from "components/InputField/InputField";
// utils
import { updateUserAddress } from "firebase/users.utils";

function AddressDetails({
  currentUserAddress,
  currentUserId,
  setCurrentUserAddress,
  isOperationRunning,
  toggleIsOperationRunning,
  showNotification,
}) {
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const {
    address: userAddress,
    city: userCity,
    state: userState,
    zipcode: userZipcode,
  } = currentUserAddress || {};

  useEffect(() => {
    if (currentUserAddress) {
      const { city, state, zipcode, address } = currentUserAddress;
      setCity(city);
      setState(state);
      setAddress(address);
      setZipcode(zipcode);
    }
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const addressDetails = { address, city, state, zipcode };
    toggleIsOperationRunning();
    try {
      await updateUserAddress(currentUserId, addressDetails);
      setCurrentUserAddress(addressDetails);
      setDisplayDialog(false);
      toggleIsOperationRunning();
      showNotification("your address is updated succesfully", "success");
    } catch (error) {
      showNotification(error.message, "error");
      setDisplayDialog(false);
      toggleIsOperationRunning();
    }
  };

  return (
    <Fragment>
      <S.AddressDetailsContainer hasaddress={currentUserAddress}>
        {currentUserAddress ? (
          <S.AddressDetailsAddress>
            {`${userAddress}, ${userCity}, ${userState}, ${userZipcode}`}
          </S.AddressDetailsAddress>
        ) : (
          <span>&#8212;</span>
        )}
        {/* <div>You have not added address yet.</div> */}
        <CustomButton
          onClick={() => setDisplayDialog(true)}
          isActive
          color="pink"
          size="xs"
          disabled={isOperationRunning}
        >
          Change Address
        </CustomButton>
      </S.AddressDetailsContainer>
      <CustomDialog
        heading="change Address"
        open={displayDialog}
        handleClose={() =>
          !isOperationRunning ? setDisplayDialog(!displayDialog) : null
        }
      >
        <S.AddressDetailsDialogForm onSubmit={formSubmitHandler}>
          <S.CapitalizedAddressDetailsInputField
            type="text"
            label="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <S.CapitalizedAddressDetailsInputField
            type="text"
            label="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <S.CapitalizedAddressDetailsInputField
            type="text"
            label="State"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <InputField
            type="text"
            inputProps={{
              title: "Please enter valid Zipcode",
              pattern: "[0-9]{6}",
            }}
            label="Zipcode"
            required
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
          <CustomButton
            disabled={isOperationRunning}
            hasLoading
            isLoading={isOperationRunning}
            type="submit"
            size="small"
            color="pink"
            align="center"
          >
            Change Address
          </CustomButton>
        </S.AddressDetailsDialogForm>
      </CustomDialog>
    </Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
  currentUserAddress: selectCurrentUserAddress,
  isOperationRunning: selectIsOperationRunning,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserAddress: (address) => dispatch(setCurrentUserAddress(address)),
  toggleIsOperationRunning: () => dispatch(toggleIsOperationRunning()),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
