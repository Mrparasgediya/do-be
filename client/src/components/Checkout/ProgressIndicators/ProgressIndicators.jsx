import React from "react";
// styles
import * as S from "./ProgressIndicators.styles";
// components
import ProgressIndicator from "./ProgressIndicator/ProgressIndicator";

const paymentSteps = {
  items: "Order Items",
  address: "Address",
  payment: "payment",
  orderStatus: "Status",
};

function ProgressIndicators() {
  return (
    <S.ProgressIndicatorsContainer>
      {Object.keys(paymentSteps).map((step, idx) => (
        <ProgressIndicator
          key={idx}
          step={step}
          innerText={paymentSteps[step]}
          hasNextLine={idx < 3}
        />
      ))}
    </S.ProgressIndicatorsContainer>
  );
}

export default ProgressIndicators;
