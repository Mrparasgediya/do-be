import React from "react";
// styles
import * as S from "./ErrorBoundry.styles";
// assets
import errorImage from "assets/images/404.png";

class ErrorBoundry extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  // catches error when errored
  static getDerivedStateFromError() {
    return { hasErrored: true };
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <S.ErrorContainer>
          <S.ErrorImage src={errorImage} alt="404-img" />
          <S.ErrorHeading>This is Page lost in space</S.ErrorHeading>
          <S.ErrorText>Page not found ! Refresh the page</S.ErrorText>
        </S.ErrorContainer>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundry;
