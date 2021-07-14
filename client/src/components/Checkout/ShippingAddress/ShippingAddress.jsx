import React, { useEffect, useState } from "react";
// styles
import * as S from "./ShippingAddress.styles";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  setContactDetails,
  setShippingAddress,
} from "redux/checkout/checkout.actions";
import { selectShippingAddress } from "redux/checkout/checkout.selectors";
import {
  selectCurrentUserAddress,
  selectCurrentUserId,
  selectCurrentUserName,
  selectCurrentUserPhoneNumber,
} from "redux/user/user.selectors";
import { setCurrentUserAddress } from "redux/user/user.actions";
import { showNotification } from "redux/notification/notification.actions";
// components
import { Checkbox } from "@material-ui/core";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import InputField from "components/InputField/InputField";
// utils
import { updateUserAddress } from "firebase/users.utils";

function ShippingAddress({
  onGoBackClick,
  onNextClick,
  setContactDetails,
  setShippingAddress,
  shippingAddressDetails,
  currentUserId,
  setCurrentUserAddress,
  userAddress,
  userPhoneNo,
  userName,
  showNotification,
}) {
  const [saveDetails, setSaveDetails] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const userContactNo = userPhoneNo.split("+91")[1];

  useEffect(() => {
    if (userName) setName(userName);
  }, [userName]);

  useEffect(() => {
    const { address, city, state, zipcode } = shippingAddressDetails;
    if (city) setCity(city);
    if (address) setAddress(address);
    if (state) setState(state);
    if (zipcode) setZipcode(zipcode);
  }, [shippingAddressDetails]);

  const setUserAddress = () => {
    setShippingAddress(userAddress);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const contactDetails = {
      name: name.toLowerCase(),
      contactNo: userPhoneNo,
    };
    const shippingAddressDetails = {
      address: address.toLowerCase(),
      city: city.toLowerCase(),
      state: state.toLowerCase(),
      zipcode: parseInt(zipcode),
    };

    try {
      if (saveDetails) {
        const addressDetails = { address, city, state, zipcode };
        await updateUserAddress(currentUserId, addressDetails);
        setCurrentUserAddress(addressDetails);
        showNotification("address saved successfully.", "success");
      }

      setContactDetails(contactDetails);
      setShippingAddress(shippingAddressDetails);
      onNextClick();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <S.ShippingAddressForm onSubmit={formSubmitHandler}>
      {userAddress && (
        <S.ShippingAddressUseDetailsButton
          type="button"
          color="skyblue"
          size="xs"
          isActive
          onClick={setUserAddress}
        >
          use saved details
        </S.ShippingAddressUseDetailsButton>
      )}
      <S.ShippintAddressContainer>
        <S.ShippingAddressInputsAndHeadingContainer>
          <S.ShippingAddressHeading>Contact Details</S.ShippingAddressHeading>
          <S.ShippintAddressInputsContainer>
            <S.StyledShippingAddressCapitalizedInput
              type="text"
              label="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              type="tel"
              label="Contact No"
              inputProps={{
                title: "Please enter valid indian contact no",
                pattern: "^[6789]\\d{9}$",
              }}
              helperText="must be valid indian no"
              required
              disabled
              defaultValue={userContactNo}
            />
          </S.ShippintAddressInputsContainer>
        </S.ShippingAddressInputsAndHeadingContainer>
        <S.ShippingAddressInputsAndHeadingContainer>
          <S.ShippingAddressHeading>
            Shipping Address Details
          </S.ShippingAddressHeading>
          <S.ShippintAddressInputsContainer>
            <S.StyledShippingAddressCapitalizedInput
              type="text"
              label="Address"
              required
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            <S.StyledShippingAddressCapitalizedInput
              type="text"
              label="City"
              required
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <S.StyledShippingAddressCapitalizedInput
              type="text"
              label="State"
              required
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
            <InputField
              type="text"
              inputProps={{
                title: "Please enter Zipcode",
                pattern: "[0-9]{6}",
              }}
              label="Zipcode"
              required
              onChange={(e) => setZipcode(e.target.value)}
              value={zipcode}
            />
            <S.ShippingAddressFormControlLabel
              control={
                <Checkbox
                  checked={saveDetails}
                  onChange={() => setSaveDetails(!saveDetails)}
                  name={"saveaddress"}
                />
              }
              label={"Save this address details."}
            />
          </S.ShippintAddressInputsContainer>
        </S.ShippingAddressInputsAndHeadingContainer>
      </S.ShippintAddressContainer>
      <NavigationButtons
        onGoBackClick={onGoBackClick}
        onNextClick={null}
        nextButtonType="submit"
      />
    </S.ShippingAddressForm>
  );
}

const mapStateToProps = createStructuredSelector({
  shippingAddressDetails: selectShippingAddress,
  userPhoneNo: selectCurrentUserPhoneNumber,
  currentUserId: selectCurrentUserId,
  userAddress: selectCurrentUserAddress,
  userName: selectCurrentUserName,
});

const mapDispatchToProps = (dispatch) => ({
  setContactDetails: (contactDetails) =>
    dispatch(setContactDetails(contactDetails)),
  setShippingAddress: (shippingAddress) =>
    dispatch(setShippingAddress(shippingAddress)),
  setCurrentUserAddress: (address) => dispatch(setCurrentUserAddress(address)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
