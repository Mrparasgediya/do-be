import { combineReducers } from "redux";

import brandVideoReducer from "./brandVideo/brandVideo.reducer";
import newsletterReducer from "./newsletter/newsletter.reducer";

const staticReducer = combineReducers({
  brandVideo: brandVideoReducer,
  newsletter: newsletterReducer,
});

export default staticReducer;
