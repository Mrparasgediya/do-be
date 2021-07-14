import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
// styles
import * as S from "./Navbar.styles";
// static data
import { menuList, iconList } from "./data";
// assets
import BrandImage from "../../assets/icons/navigation/brand.png";
// redux
import { connect } from "react-redux";
import { setCurrentFilter } from "redux/filter/filter.action";
import { getBrandsAndCollectionsIdsBySearchQuery } from "firebase/firebase.utils";
// components
import List from "../List/List";
import CustomButton from "../CustomButton/CustomButton";
import SearchIcon from "@material-ui/icons/Search";
import InputField from "components/InputField/InputField";
// utils
import { getCollectionsListForNavbar } from "firebase/collections.utils";
import { showNotification } from "redux/notification/notification.actions";

const Navbar = ({ history, setCurrentFilter, showNotification }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [toggleSearchBar, setToggleSearchBar] = React.useState(false);
  const [collectionList, setCollectionList] = useState([
    { name: "mens", linkUrl: "/", hasNavMenu: true, menu: [] },
    { name: "womens", linkUrl: "/", hasNavMenu: true, menu: [] },
    { name: "girls", linkUrl: "/", hasNavMenu: true, menu: [] },
    { name: "boys", linkUrl: "/", hasNavMenu: true, menu: [] },
  ]);
  const searchTextInputRef = useRef();

  iconList[0].toggleSearchIcon = toggleSearchBar;
  iconList[0].handleToggleSearchIcon = () =>
    setToggleSearchBar(!toggleSearchBar);

  useEffect(() => {
    const fetchCollectionList = async () => {
      try {
        const [list, error] = await getCollectionsListForNavbar([
          ...collectionList,
        ]);
        if (error) throw new Error(error);
        setCollectionList(list);
      } catch (error) {
        showNotification(
          `can't get navbar list items ${error.message}`,
          "error"
        );
      }
    };
    fetchCollectionList();
  }, []);

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault();
    const { brands, collections } =
      await getBrandsAndCollectionsIdsBySearchQuery(
        searchTextInputRef.current.value
      );
    setCurrentFilter({ group: "all", brands, collections });
    history.push("/search");
    searchTextInputRef.current.value = "";
  };

  return (
    <div>
      <S.StyledNavbarAppBar position="fixed">
        {!toggleSearchBar && (
          <S.StyledNavbarToolbar toolbartype="navbar">
            <S.NavbarBrandLogo
              onClick={() => history.push("/")}
              src={BrandImage}
              alt="brand-logo"
            />

            <List
              list={collectionList}
              listType="collectionList"
              isCollectionList
            />
            <List
              list={iconList}
              listType="iconList"
              isIconList
              toggleSearchBar={toggleSearchBar}
              handleToggleSearchBar={() => setToggleSearchBar(!toggleSearchBar)}
            />
            <S.HamburgerIcon
              isActive={toggleMenu}
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <S.HamburgerIconLine />
              <S.HamburgerIconLine />
              <S.HamburgerIconLine />
            </S.HamburgerIcon>
          </S.StyledNavbarToolbar>
        )}
        {toggleSearchBar && (
          <S.StyledNavbarToolbar toolbartype="search">
            <S.StyledArrowBackIcon
              onClick={() => setToggleSearchBar(!toggleSearchBar)}
            />
            <S.NavbarSearchForm onSubmit={handleSearchFormSubmit}>
              <InputField
                color="secondary"
                label="search brands or collections"
                name="search"
                type="search"
                ref={searchTextInputRef}
                fullWidth
              />
              <CustomButton type="submit" buttonType="search">
                <SearchIcon />
              </CustomButton>
            </S.NavbarSearchForm>
          </S.StyledNavbarToolbar>
        )}
      </S.StyledNavbarAppBar>
      {window.innerWidth < 1024 && (
        <S.StyledMobileMenu isActive={toggleMenu}>
          <List
            list={menuList}
            isMenuList
            listType="menuList"
            handleMenuItemClick={() => setToggleMenu(!toggleMenu)}
          />
        </S.StyledMobileMenu>
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setCurrentFilter: (filter) => dispatch(setCurrentFilter(filter)),
  showNotification: (message, type) =>
    dispatch(showNotification(message, type)),
});
export default connect(null, mapDispatchToProps)(withRouter(Navbar));
