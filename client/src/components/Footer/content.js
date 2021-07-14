import GoogleDownload from "../../assets/images/footer/google download.png";
import DeliverTruck from "../../assets/images/footer/delivery truck.png";
import AppleDownload from "../../assets/images/footer/apple download.png";
import OrigionalProduct from "../../assets/images/footer/origional.png";
import ReturnProduct from "../../assets/images/footer/return_.png";
import { ReactComponent as FacebookIcon } from "../../assets/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/social/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/social/twitter.svg";

const content = [
  {
    heading: "online shopping",
    items: ["Mens", "Womens", "Girls", "Boys"],
    isCollectionList: true,
  },
  {
    heading: "userful links",
    items: [
      { name: "Contact us", linkUrl: "/contactus" },
      { name: "About us", linkUrl: "/aboutus" },
    ],
    hasLinkUrl: true,
  },
  {
    hasMultiplList: true,
    lists: [
      {
        hasImage: true,
        heading: "Experiance do & be app on mobile",
        items: [GoogleDownload, AppleDownload],
      },
      {
        hasSvg: true,
        heading: "Keep in touch",
        items: [
          { Svg: FacebookIcon, name: "facebook" },
          { Svg: InstagramIcon, name: "instagram" },
          { Svg: TwitterIcon, name: "twitter" },
        ],
      },
    ],
  },
  {
    hasFeatures: true,
    items: [
      {
        name: "origional-products",
        src: OrigionalProduct,
        boldText: "100% ORIGIONAL",
        text: "guarantee for all products at DO&BE.com",
      },
      {
        name: "return-product",
        src: ReturnProduct,
        boldText: "Return within 30days",
        text: "of receiving your order",
      },
      {
        name: "delivery",
        src: DeliverTruck,
        boldText: "Get free delivery",
        text: "for every order above Rs.799",
      },
    ],
  },
];
export default content;
