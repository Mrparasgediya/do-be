import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
// styles
import * as S from "./ListIcon.styles";
import { makeStyles } from "@material-ui/core";
// redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "redux/user/user.selectors";
import { setCurrentFilter } from "redux/filter/filter.action";
// components
import CustomButton from "../../CustomButton/CustomButton";
import MenuList from "../MenuList/MenuList";
import InputField from "components/InputField/InputField";
// utils
import { getBrandsAndCollectionsIdsBySearchQuery } from "firebase/firebase.utils";

const useStyles = makeStyles({
  icon: {
    fill: "#fff",
    height: "3rem ",
    width: "3rem ",
    transition: "all .3s ease-in-out",
    position: "relative ",
    "@media (max-width: 768px)": {
      height: "4rem ",
      width: "4rem ",
    },
  },
});

function ListIcon({
  isSearchIcon,
  iconComponent: Icon,
  handleToggleSearchIcon,
  isProfileIcon,
  menu,
  name,
  linkUrl,
  currentUser,
  setCurrentFilter,
}) {
  const [toggleProfileNav, setToggleProfileNav] = useState(false);
  const searchTextRef = useRef();
  const classes = useStyles();

  let icon = undefined;
  const history = useHistory();

  if (isSearchIcon) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { brands, collections } =
        await getBrandsAndCollectionsIdsBySearchQuery(
          searchTextRef.current.value
        );
      setCurrentFilter({ group: "all", brands, collections });
      history.push("/search");
      searchTextRef.current.value = null;
    };

    if (window.innerWidth > 768) {
      icon = (
        <S.StyledListIconForm onSubmit={handleSubmit}>
          <InputField
            color="secondary"
            type="search"
            label="search brand or collection"
            ref={searchTextRef}
            required
          />
          <CustomButton name="searchButton" buttonType="search">
            <Icon className={classes.icon} />
          </CustomButton>
        </S.StyledListIconForm>
      );
    } else {
      icon = <Icon className={classes.icon} onClick={handleToggleSearchIcon} />;
    }
  }

  if (isProfileIcon) {
    icon = (
      <S.ProfileIconContainer>
        <span
          onMouseOver={() => setToggleProfileNav(!toggleProfileNav)}
          onMouseOut={() => setToggleProfileNav(!toggleProfileNav)}
        >
          <Icon className={classes.icon} />
          <S.StyledListIconName>
            {currentUser ? name : "Sign In"}
          </S.StyledListIconName>
        </span>

        <MenuList
          menu={menu}
          menuType="profileMenu"
          toggleMenu={toggleProfileNav}
          handleMenuItemClick={() => setToggleProfileNav(false)}
          handleMouseOver={() => setToggleProfileNav(true)}
          handleMouseOut={() => setToggleProfileNav(false)}
        />
      </S.ProfileIconContainer>
    );
  }

  if (icon === undefined) {
    icon = (
      <S.StyledListIconLink to={linkUrl}>
        <Icon className={classes.icon} />
        <S.StyledListIconName>{name}</S.StyledListIconName>
      </S.StyledListIconLink>
    );
  }

  return icon;
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentFilter: (filter) => dispatch(setCurrentFilter(filter)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ListIcon);
