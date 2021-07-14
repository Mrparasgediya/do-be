import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import brandsReducer from "./brands/brands.reducer";
import staticReducer from "./static/static.reducer";
import collectionsReducer from "./collections/collections.reducer";
import adminReducer from "./admin/admin.reducer";
import filterReducer from "./filter/filte.reducer";
import checkoutReducer from "./checkout/checkout.reducer";
import notificationReducer from "./notification/notification.reducer";
import itemPreviewReducer from "./itemPreview/itemPreview.reducer";

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  brands: brandsReducer,
  static: staticReducer,
  collections: collectionsReducer,
  filter: filterReducer,
  checkout: checkoutReducer,
  notification: notificationReducer,
  itemPreview: itemPreviewReducer,
});

export default rootReducer;
