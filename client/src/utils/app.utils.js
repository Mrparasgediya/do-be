export const getResourceSize = () => {
  if (window.innerWidth < 426) return "small";
  if (window.innerWidth < 769) return "med";
  return "large";
};

export const getHomeItemsCount = (itemsFor) => {
  const width = window.innerWidth;
  if (width < 426) {
    return itemsFor === "brand" ? 6 : 8;
  }
  if (width < 769) {
    return 9;
  }
  if (width < 1441) {
    return 10;
  }
  return 12;
};

export const scrollWindowToTop = () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

export const getSearchItemsPerPageCount = () => {
  const width = window.innerWidth;
  if (width < 426) {
    return 10;
  }
  if (width < 1441) {
    return 9;
  }
  return 12;
};

export const getAuthRedirectUrlDomain = () => {
  if (process.env.NODE_ENV === "production")
    return "https://do-be.herokuapp.com";
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
};
