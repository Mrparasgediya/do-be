import { Alert } from "@material-ui/lab";
import styled, { css } from "styled-components";

const closeButtonStyle = css`
  & {
    .MuiSvgIcon-root {
      fill: var(--color-white);
    }
    .MuiButtonBase-root {
      color: var(--color-white) !important;
    }
  }
`;

const successNotificationStyle = css`
  color: var(--color-white) !important;
  background: rgba(3, 166, 133, 0.6) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px !important;
  border: 1px solid rgba(3, 166, 133, 0.5);
  ${closeButtonStyle}
`;

const errorNotificationStyle = css`
  color: var(--color-white) !important;
  background: rgba(255, 70, 70, 0.6) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px !important;
  border: 1px solid rgba(255, 70, 70, 0.5);
  ${closeButtonStyle}
`;

const infoNotificationStyle = css`
  color: var(--color-white) !important;
  background: rgba(11, 188, 222, 0.6) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px !important;
  border: 1px solid rgba(11, 188, 222, 0.5);
  ${closeButtonStyle}
`;

const getNotificationStyle = (type) => {
  if (type === "success") return successNotificationStyle;
  if (type === "error") return errorNotificationStyle;
  if (type === "info") return infoNotificationStyle;
};

const openNotificationStyle = css`
  display: flex;
  visibility: visible;
  opacity: 1;
`;

const hideNotificationStyle = css`
  visibility: hidden;
  opacity: 0;
  ${setTimeout(() => {
    return css`
      display: none;
    `;
  }, 3000)}
`;

export const StyledNotification = styled(Alert)`
  position: fixed;
  top: 10rem;
  left: 50%;
  min-width: 60%;
  min-height: 50px;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    z-index: 1500 !important;
  }

  @media (max-width: 425px) {
    width: 95%;
  }
  @media (min-width: 426px and max-width: 768px) {
    width: 80%;
  }

  z-index: 3;
  text-transform: capitalize;
  font-size: var(--font-md) !important;
  transition: all 0.2s ease-in-out !important;

  & {
    .MuiSvgIcon-fontSizeSmall {
      height: 1.8rem !important;
      width: 1.8rem !important;
    }
  }
  ${(props) => getNotificationStyle(props.type)}
  ${(props) => (props.open ? openNotificationStyle : hideNotificationStyle)}
`;
