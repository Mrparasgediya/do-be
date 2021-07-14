import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import SearchIcon from "@material-ui/icons/Search";

export const menuList = [
  {
    name: "Hello",
    menuItem: true,
    isGreetingText: true,
    isUserLoggedInListItem: true,
    linkUrl: "/user/profile",
  },
  {
    name: "Orders",
    menuItem: true,
    isUserLoggedInListItem: true,
    linkUrl: "/user/orders",
  },
  {
    name: "Sign In",
    menuItem: true,
    isUserLoggedInListItem: false,
    linkUrl: "/users/signin",
  },
  {
    name: "Sign Up",
    menuItem: true,
    isUserLoggedInListItem: false,
    linkUrl: "/users/signup",
  },
  {
    name: "Mens",
    menuItem: true,
    linkUrl: "/mens",
  },
  {
    name: "Womens",
    menuItem: true,
    linkUrl: "/womens",
  },
  {
    name: "Girls",
    menuItem: true,
    linkUrl: "/girls",
  },
  {
    name: "Boys",
    menuItem: true,
    linkUrl: "/boys",
  },
  {
    name: "Logout",
    menuItem: true,
    isLogoutItem: true,
    isUserLoggedInListItem: true,
    linkUrl: "/",
  },
];

export const iconList = [
  {
    name: "Search",
    iconComponent: SearchIcon,
    hasIcon: true,
    isSearchIcon: true,
  },
  {
    name: "Profile",
    iconComponent: PersonOutlinedIcon,
    hideIcon: true,
    hasIcon: true,
    isProfileIcon: true,
    menu: [
      {
        name: "Sign In",
        isUserLoggedInListItem: false,
        linkUrl: "/users/signin",
      },
      {
        name: "Sign Up",
        isUserLoggedInListItem: false,
        linkUrl: "/users/signup",
      },
      {
        name: "Profile",
        isUserLoggedInListItem: true,
        linkUrl: "/user/profile",
      },
      { name: "Orders", isUserLoggedInListItem: true, linkUrl: "/user/orders" },
    ],
  },
  {
    name: "Wishlist",
    iconComponent: FavoriteBorderOutlinedIcon,
    hasIcon: true,
    linkUrl: "/user/wishlist",
  },
  {
    name: "Bag",
    iconComponent: LocalMallOutlinedIcon,
    hasIcon: true,
    linkUrl: "/user/bag",
  },
];
