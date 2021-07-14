import React, { useEffect, useState } from "react";
// styles
import * as S from "./ChangePhoneNo.styles";
// components
import SendOTP from "components/ChangePhoneNo/SendOTP/SendOTP";
import VerifyOTP from "components/ChangePhoneNo/VerifyOTP/VerifyOTP";
// utils
import { scrollWindowToTop } from "utils/app.utils";

function ChangePhoneNo() {
  const [currentPanel, setCurrentPanel] = useState("sendOTP");
  const [verificationId, setVerificationId] = useState(undefined);
  const [phoneNo, setPhoneNo] = useState();

  useEffect(() => {
    scrollWindowToTop();
  }, []);

  return (
    <S.StyledChangePhoneNoCustomContainer size="small">
      <S.ChangePhoneNoHeading>Change Phone no</S.ChangePhoneNoHeading>
      {currentPanel === "sendOTP" && (
        <SendOTP
          onNext={() => setCurrentPanel("verifyOTP")}
          setVerificationId={(verificationId) =>
            setVerificationId(verificationId)
          }
          setPhoneNo={(phoneNo) => setPhoneNo(phoneNo)}
        />
      )}
      {currentPanel === "verifyOTP" && (
        <VerifyOTP
          verificationId={verificationId}
          onGoBack={() => setCurrentPanel("sendOTP")}
          phoneNo={phoneNo}
        />
      )}
    </S.StyledChangePhoneNoCustomContainer>
  );
}

export default ChangePhoneNo;
