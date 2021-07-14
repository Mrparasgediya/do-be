import { AppBar, Toolbar } from "@material-ui/core";
import ArrowBackRounded from "@material-ui/icons/ArrowBackRounded";
import styled, { css, keyframes } from "styled-components";
import { glassEffect } from "assets/styles/mixins.styles";

export const StyledNavbarAppBar = styled(AppBar)`
  height: 8rem;
  width: 100% !important;
  justify-content: center;
  font-size: var(--font-md);
  ${glassEffect("black")}
  box-shadow: none !important;
  z-index: 100;
`;

const navbarToolbarStyle = css`
  padding: 0 10% !important;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;
const searchToolbarstyle = css`
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0rem 1rem !important;
  }
`;

export const getToolbarStyle = ({ toolbartype }) => {
  if (toolbartype === "navbar") return navbarToolbarStyle;
  if (toolbartype === "search") return searchToolbarstyle;
};

export const StyledNavbarToolbar = styled(Toolbar)`
  ${(props) => getToolbarStyle(props)}
  @media (min-width: 769px) and (max-width: 1440px) {
    padding: 0 5% !important;
  }
  @media (max-width: 768px) {
    padding: 0 2rem !important;
  }
`;

export const NavbarBrandLogo = styled.img`
  height: 6.5rem;
  @media (min-width: 768px) {
    cursor: pointer;
  }
`;

// hamburger icon
export const HamburgerIconLine = styled.span`
  display: block;
  height: 3px;
  border-radius: 5px;
  width: 100%;
  background-color: white;
  transition: transform 0.3s;
  transform-origin: 2.5px 1.5px;

  &:nth-child(2) {
    width: 75%;
    margin-left: auto;
    transition: width 0.3s;
  }

  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const activeHamburgerIconStyle = css`
  ${HamburgerIconLine} {
    &:nth-child(2) {
      width: 0;
      visibility: hidden;
    }

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
  }
`;
export const HamburgerIcon = styled.span`
  height: 30px;
  width: 30px;
  margin-left: 15px;
  padding: 5px 0;
  display: none;

  &:hover {
    transform: none;
  }

  ${(props) => props.isActive && activeHamburgerIconStyle}

  @media (max-width: 768px) {
    display: block;
  }
`;
// search navbar
export const NavbarSearchForm = styled.form`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-evenly;
`;

export const StyledArrowBackIcon = styled(ArrowBackRounded)`
  width: 3rem;
  height: 3rem;
`;
// mobile menu
const animateMobileMenu = keyframes`
  0% {
    & {
      width: 0;
      > ul {
        visibility: hidden;
      }
    }
  }

  100% {
    & {
      width: 100%;

      > ul {
        visibility: visible;
      }
    }
  }

  120% {
    & {
      > ul {
        visibility: visible;
      }
    }
  }
`;

const getActivMobileMenuStyle = css`
  animation: ${animateMobileMenu} 1s fade-in forwards;
  width: 100%;

  > ul {
    visibility: visible;
  }
`;

export const StyledMobileMenu = styled.div`
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  height: 100vh;
  width: 0;
  z-index: 10;
  transition: all 0.3s ease-in-out;
  overflow: scroll;
  ${glassEffect("black")}

  > ul {
    visibility: hidden;
  }
  @media (max-width: 768px) {
    display: block;
  }
  ${(props) => props.isActive && getActivMobileMenuStyle}
`;
