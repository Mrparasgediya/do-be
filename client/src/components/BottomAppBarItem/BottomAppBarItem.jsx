import React from "react";
// styles
import * as S from "./BottomAppBarItem.styles";
import { makeStyles, CircularProgress } from "@material-ui/core";
// hocs
import withButtonBase from "../withButtonBase/withButtonBase";

const useStyles = makeStyles({
  icon: {
    height: ({ iconsize }) => {
      return iconsize === "large" ? "3rem" : "2.5rem";
    },
    width: ({ iconsize }) => (iconsize === "large" ? "3rem" : "2.5rem"),
  },
});

const BottomAppBarItem = ({
  name,
  Icon,
  hasRightBorder,
  color,
  iconSize,
  isActive,
  hasLoading,
  isLoading,
  disabled,
  ...otherProps
}) => {
  const classes = useStyles({ iconsize: iconSize }); //makesytle props

  return (
    <S.BottomAppBarItemContainer
      isActive={isActive}
      hasRightBorder={hasRightBorder}
      color={color}
      {...otherProps}
      disabled={isLoading || disabled}
    >
      {hasLoading && isLoading && (
        <CircularProgress
          style={{
            color: `var(--color-${color})`,
            height: "4rem",
            width: "4rem",
          }}
        />
      )}
      <S.BottomAppBarItemName>{name}</S.BottomAppBarItemName>
      <Icon className={classes.icon} />
    </S.BottomAppBarItemContainer>
  );
};

export default withButtonBase(BottomAppBarItem);
