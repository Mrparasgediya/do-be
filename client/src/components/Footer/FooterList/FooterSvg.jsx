import React from "react";
// components
import { makeStyles } from "@material-ui/core";

const facebookIconStyle = {
  fill: "#3b5999",
};

const twitterIconStyle = { fill: "#55acee" };

const instagramIconStyle = { fill: "#e4405f" };

export const getIconStyle = (name) => {
  if (name === "facebook") return facebookIconStyle;
  if (name === "instagram") return instagramIconStyle;
  if (name === "twitter") return twitterIconStyle;
};

const useStyles = makeStyles({
  icon: (props) => ({ height: "2.5rem", ...props }),
});

function FooterSvg({ Svg, name }) {
  const classes = useStyles(getIconStyle(name));
  return <Svg className={classes.icon} />;
}

export default FooterSvg;
