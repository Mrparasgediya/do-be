import { combineReducers } from "redux";

import brandsReducer from "./brands/brands.reducer";
import staticReducer from "./static/static.reducer";
import collectionsReducer from "./collections/collections.reducer";
import itemsReducer from "./items/items.reducer";
import usersReducer from "./users/users.reducer";
import ordersReducer from "./orders/orders.reducer";
import contactUsReducer from "./contactus/contactus.reducer";

const adminReducer = combineReducers({
  brands: brandsReducer,
  static: staticReducer,
  collections: collectionsReducer,
  items: itemsReducer,
  users: usersReducer,
  orders: ordersReducer,
  contactUs: contactUsReducer,
});

export default adminReducer;
