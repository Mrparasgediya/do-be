import React from "react";
import InputField from "components/InputField/InputField";
import * as S from "./CustomAutoCompleteSelect.styles";

const CustomPaper = (props) => {
  return <S.StyledPaper {...props} />;
};

function CustomAutoCompleteSelect({
  options,
  getOptionLabel,
  label,
  required,
  ...otherProps
}) {
  return (
    <S.StyledAutoComplete
      options={options}
      autoHighlight
      getOptionLabel={getOptionLabel}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <InputField {...params} label={label} required={required} />
      )}
      {...otherProps}
    />
  );
}

export default CustomAutoCompleteSelect;
