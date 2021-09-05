 
// image object should be like this
// {small: "mobile image url", med: "tablet device image url", large: "desktop image url",  org: "origional image url" }

const getImageAccordingToDevice = (image) => {
  const deviceWidth = window.innerWidth;

  if (deviceWidth < 481) {
    return image.small;
  }
  if (deviceWidth < 769) {
    return image.med;
  }
  if (deviceWidth < 1441) {
    return image.large;
  }
  return image.org;
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
    image: getImageAccordingToDevice(), // girls image as argument
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
    image: getImageAccordingToDevice(),// womens image as argument
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
    image: getImageAccordingToDevice(),// mens image as argument
  },
];

export default homeSlidesData;
