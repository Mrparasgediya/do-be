const getImageSrcFromPublicId = (publicId) => {
  const allSizes = ["med", "large", "small", "org"];
  const srcsKeys = ["srcSet", "placeholderSrc", "src"];
  const baseUrl = "https://res.cloudinary.com/dobe/image/upload/g_east,";
  const endUrl = `/v1620881594/do-be/static/${publicId}.webp`;
  const filters = {
    med: {
      srcSet: "c_crop,h_1080,w_1024,x_200",
      placeholderSrc: "c_fit,h_108,w_102,x_200",
      src: "c_crop,h_1080,w_1024,x_200",
    },
    large: {
      srcSet: "c_crop,h_1080,q_90,w_1440,x_100",
      placeholderSrc: "c_fit,h_108,q_90,w_144,x_100",
      src: "c_crop,h_1080,q_90,w_1440,x_100",
    },
    small: {
      srcSet: "c_crop,h_1080,w_640,x_250",
      placeholderSrc: "c_fit,h_108,w_64,x_250",
      src: "c_crop,h_1080,w_640,x_250",
    },
    org: {
      srcSet: "c_crop,q_90",
      placeholderSrc: "c_fit,w_192,h_108,q_90",
      src: "c_crop,q_90",
    },
  };

  return allSizes.reduce(
    (src, currentSize) => ({
      ...src,
      [currentSize]: srcsKeys.reduce((srcKeys, currentSrcKey) => {
        return {
          ...srcKeys,
          [currentSrcKey]: `${baseUrl}${filters[currentSize][currentSrcKey]}${
            currentSrcKey === "src" && currentSize === "org"
              ? endUrl.replace(".webp", ".jpg")
              : endUrl
          }`,
        };
      }, {}),
    }),
    {}
  );
};

const getImageAccordingToDevice = (publicId) => {
  const deviceWidth = window.innerWidth;

  if (deviceWidth < 481) {
    return getImageSrcFromPublicId(publicId).small;
  }
  if (deviceWidth < 769) {
    return getImageSrcFromPublicId(publicId).med;
  }
  if (deviceWidth < 1441) {
    return getImageSrcFromPublicId(publicId).large;
  }
  return getImageSrcFromPublicId(publicId).org;
};

const homeSlidesData = [
  {
    name: "girls",
    heading: {
      firstLine: "your li'l one's",
      secondLine: "style",
      scriptText: "file",
    },
    group: ["girls"],
    discountRate: "0%",
    image: getImageAccordingToDevice("dptqrxasakxv6ta0wgn5"),
  },

  {
    name: "Womens",
    heading: {
      firstLine: "Fashion fade.",
      secondLine: "style is ",
      scriptText: "eternal",
    },
    group: ["womens"],
    discountRate: "0%",
    image: getImageAccordingToDevice("nhpb3ziry2j8qfpha0og"),
  },
  {
    name: "Mens",
    heading: {
      firstLine: "FIND YOUR",
      secondLine: "RIGHT",
      scriptText: "fit",
    },
    discountRate: "0%",
    group: ["mens"],
    image: getImageAccordingToDevice("d4ejxppas7v4kpc54xwq"),
  },
];

export default homeSlidesData;
