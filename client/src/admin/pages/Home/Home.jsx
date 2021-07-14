import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
// styles
import * as S from "./Home.styles";
// components;
import Brands from "../Brands/Brands";
import Items from "../Items/Items";
import Users from "../Users/Users";
import Newsletter from "../Newsletter/Newsletter";
import BrandVideo from "../BrandVideo/BrandVideo";
import Collections from "../Collections/Collections";
import Orders from "../Orders/Orders";
import ContactUs from "../ContactUs/ContactUs";

function Home({ match: { params } }) {
  const [currentWindow, setCurrentWindow] = useState(params.currentPage);

  useEffect(() => {
    setCurrentWindow(params.currentPage);
  }, [params.currentPage]);

  return (
    <S.HomeContainer>
      <S.StyledDrawer variant="permanent" open>
        <S.StyledList>
          <Link to="/admin/items">
            <S.StyledListItem button>
              <S.StyledListItemText>items</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
          <Link to="/admin/brands">
            <S.StyledListItem button>
              <S.StyledListItemText>brands</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
          <Link to="/admin/collections">
            <S.StyledListItem button>
              <S.StyledListItemText>collections</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
          <Link to="/admin/users">
            <S.StyledListItem button>
              <S.StyledListItemText>users</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
          <Link to="/admin/newsletter">
            <S.StyledListItem button>
              <S.StyledListItemText>newsletter</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
          <Link to="/admin/brandVideo">
            <S.StyledListItem button>
              <S.StyledListItemText>brand Video</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
          <Link to="/admin/orders">
            <S.StyledListItem button>
              <S.StyledListItemText>orders</S.StyledListItemText>
            </S.StyledListItem>
          </Link>{" "}
          <Link to="/admin/contactus">
            <S.StyledListItem button>
              <S.StyledListItemText>contactus</S.StyledListItemText>
            </S.StyledListItem>
          </Link>
        </S.StyledList>
      </S.StyledDrawer>
      <S.WindowContainer>
        {currentWindow === "items" && <Items />}
        {currentWindow === "brands" && <Brands />}
        {currentWindow === "collections" && <Collections />}
        {currentWindow === "users" && <Users />}
        {currentWindow === "newsletter" && <Newsletter />}
        {currentWindow === "brandVideo" && <BrandVideo />}
        {currentWindow === "orders" && <Orders />}
        {currentWindow === "contactus" && <ContactUs />}
      </S.WindowContainer>
    </S.HomeContainer>
  );
}

export default withRouter(Home);
