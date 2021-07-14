import { createGlobalStyle } from "styled-components";
import GontserratFont from "./assets/fonts/Gontserrat-Light-Regular.woff2";
import JenrivTiltingFont from "./assets/fonts/Jenriv-Titling-Regular.woff2";
import HalaneyFont from "./assets/fonts/Halaney-Demo.woff2";
import typographyStyle from "./typography.styles";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Gontserrat";
    src: url(${GontserratFont}) format("woff2");
  }

  @font-face {
    font-family: "Jenriv";
    src: url(${JenrivTiltingFont}) format("woff2");
  }

  @font-face {
    font-family: "Halaney";
    src: url(${HalaneyFont}) format("woff2");
  }

  html {
    box-sizing: border-box;
  }

  :root {
    --color-white: #fff;
    --color-pink: #de2172;
    --color-pink-light: rgba(255, 179, 222, 0.5);
    --color-pink-hover: rgba(255, 33, 114, 0.1);
    --color-pink-very-light: #de217233;
    --color-dark-pink: #ffc0cb80;
    --color-red: #ff4646;
    --color-gray: #708090;
    --color-gray-light: #7f8c8d;
    --color-gray-image: #e7e7e7;
    --color-gray-border:#333333bf;
    --color-gray-footer: #dddddd;
    --color-black: #252525;
    --color-skyblue-light: #0bbcde;
    --color-skyblue: #0f7c91;
    --color-yellow: #fae201;
    --color-yellow-dark: #ff9966;
    --color-green-light: #03a685;
    --color-green: #067302;

    --color-twitter: #55acee;
    --color-facebook: #3b5999;
    --color-instagram: #e4405f;
    --color-google: #2d78dc; //#4285f4;

    --font-xsm: 1rem;
    --font-sm: 1.2rem;
    --font-md: 1.5rem;
    --font-md-big: 2rem;
    --font-lg: 3rem;
    --font-heading-lg: 3.5rem;
    --font-heading-xlg: 6.5rem;

    --font-family-heading: "Jenriv",'arial';
    --font-family-body: "Gontserrat",'arial';
    --font-family-script: "Halaney",'arial';

    --shadow-default: 0 0.1rem 0.8rem 0.1rem #d4d4d4b0;
    --shadow-hover: 0 0.8rem 1rem 0.3rem #d4d4d4b0;

    --default-border: 0.1rem solid var(--color-black);
    --google-border: 0.1rem solid var(--color-google);

    --cubic-bazier-function :cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }

  *,
  *::before,
  *::after {
    margin: 0px;
    padding: 0px;
    box-sizing: inherit;
  }

  body {
    background-color: #f2f4fb;
    font-family: var(--font-family-body);
    color: $black;
  }

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  
  ${typographyStyle}
`;

export default GlobalStyle;
