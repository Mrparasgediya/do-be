const materialUiGlobalStyles = (theme) => ({
  "@global": {
    html: {
      fontSize: "62.5%",
      [theme.breakpoints.up("xs")]: {
        fontSize: "50%",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "52%", //43.75 last
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "58%", //53.125 last font size before update
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "62.5%",
      },
    },
  },
});

export default materialUiGlobalStyles;
