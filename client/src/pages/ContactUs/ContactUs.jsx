import React, { useEffect, useRef, useState } from "react";
// styles
import * as S from "./ContactUs.styles";
// redux
import { connect } from "react-redux";
import { showNotification } from "redux/notification/notification.actions";
// components
import CustomButton from "components/CustomButton/CustomButton";
import CustomImage from "components/CustomImage/CustomImage";
import CustomSelect from "components/CustomSelect/CustomSelect";
import InputField from "components/InputField/InputField";
// utils
import { scrollWindowToTop } from "utils/app.utils";
import { addContactUsDetails } from "firebase/contactus.utils";
import CustomTextArea from "components/CustomTextArea/CustomTextArea";

function ContactUs({ showNotification }) {
  const probleOptions = [
    "Product Service",
    "Order Delivery Service",
    "Order Refund",
    "Payment",
    "Other",
  ];
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const descriptionInputRef = useRef();
  const [selectedProblemOption, setSelectedProblemOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollWindowToTop();
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const name = nameInputRef.current.value;
    const description = descriptionInputRef.current.value;
    setIsLoading(true);
    try {
      const [, error] = await addContactUsDetails(
        name,
        email,
        selectedProblemOption,
        description
      );
      if (error) throw new Error(error);
      setIsLoading(false);

      emailInputRef.current.value = "";
      nameInputRef.current.value = "";
      setSelectedProblemOption("");
      descriptionInputRef.current.value = "";
      showNotification("Your problem is sent to our team.", "info");
    } catch (error) {
      showNotification(error.message, "error");
      setIsLoading(false);
    }
  };
  return (
    <S.StyledContactUsCustomContainer>
      {window.innerWidth > 768 && (
        <CustomImage
          type="contactUsImage"
          src={
            "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=fit&h=700&q=10"
          }
          placeholderSrc={
            "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=fit&h=50&q=10"
          }
        />
      )}
      <S.ContactUsContainer>
        <S.ContactUsHeading>Let's Talk.</S.ContactUsHeading>
        <S.ContactUsForm onSubmit={formSubmitHandler}>
          <InputField
            type="text"
            ref={nameInputRef}
            required
            label="your name"
          />
          <InputField
            type="email"
            ref={emailInputRef}
            required
            label="contact email"
          />
          <CustomSelect
            label="What can we help you with?"
            required
            options={probleOptions}
            value={selectedProblemOption}
            onChange={(e) => setSelectedProblemOption(e.target.value)}
          />
          <S.ContactUsDescriptionInputContainer>
            <S.ContactUsLabel htmlFor="note">Description</S.ContactUsLabel>
            <CustomTextArea
              ref={descriptionInputRef}
              rows="10"
              id="note"
              placeholder="enter your question or description of the problem you're trying to solve."
              required
            ></CustomTextArea>
          </S.ContactUsDescriptionInputContainer>
          <CustomButton
            hasLoading
            isLoading={isLoading}
            align="center"
            color="pink"
            disabled={isLoading}
            loadingText="sending"
          >
            send
          </CustomButton>
        </S.ContactUsForm>
      </S.ContactUsContainer>
    </S.StyledContactUsCustomContainer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});

export default connect(null, mapDispatchToProps)(ContactUs);
