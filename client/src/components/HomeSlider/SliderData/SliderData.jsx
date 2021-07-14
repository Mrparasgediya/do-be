import React from "react";
import { withRouter } from "react-router";
// styles
import * as S from "./SliderData.styles";
// redux
import { connect } from "react-redux";
import {
  selectGroupForFilter,
  setSelectedGroupForFilter,
} from "redux/filter/filter.action";

const sliderData = ({
  data,
  setSelectedGroupForFilter,
  history,
  selectGroupForFilter,
}) => {
  const { name, heading, discountRate } = data;
  const { firstLine, secondLine, scriptText } = heading;
  return (
    <S.SliderDataContainer>
      <S.SliderHeading>
        <span>{firstLine}</span>
        <span>
          {secondLine}
          <S.HeadingScript collectionName={name}>{scriptText}</S.HeadingScript>
        </span>
      </S.SliderHeading>
      <S.SliderDiscountContainer>
        <span>get {discountRate} off </span>
        <span>on {name} wear.</span>
      </S.SliderDiscountContainer>
      <S.StyledCustomButton
        onClick={(e) => {
          const groupName = name.toLowerCase();
          setSelectedGroupForFilter(groupName);
          selectGroupForFilter(groupName);
          history.push("/search");
        }}
        size="small"
      >
        VIEW COLLECTION
      </S.StyledCustomButton>
    </S.SliderDataContainer>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setSelectedGroupForFilter: (groupName) =>
    dispatch(setSelectedGroupForFilter(groupName)),
  selectGroupForFilter: (group) => dispatch(selectGroupForFilter(group)),
});

export default connect(null, mapDispatchToProps)(withRouter(sliderData));
