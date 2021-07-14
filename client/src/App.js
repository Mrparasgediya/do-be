import React, { lazy, Suspense } from "react";
import { withStyles } from "@material-ui/core";
import { Switch, Route, withRouter } from "react-router-dom";

import GlobalStyle from "./globalStyles";
import materialUiGlobalStyles from "./materialui.styles.global";
// firebase
import { auth } from "firebase/firebase.utils";
import { createUserProfileDoc } from "firebase/users.utils";
// redux
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

// components
import RestrictedRoute from "components/RestrictedRoute/RestrictedRoute";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer/Footer";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry";
import { selectUnSubscribeUserOrdersMethod } from "redux/user/orders/orders.selectors";
import { setUnSubscribeUserOrdersMethod } from "redux/user/orders/orders.actions";

const SignInAndSignUp = lazy(() =>
  import("./pages/SignInAndSignUp/SignInAndSignUp")
);
const HomePage = lazy(() => import("./pages/Home/Home"));
const ProfileAndOrders = lazy(() =>
  import("pages/ProfileAndOrders/ProfileAndOrders")
);
const ItemPreview = lazy(() => import("pages/ItemPreview/ItemPreview"));
const BrandsAndCollections = lazy(() =>
  import("pages/BrandsAndCollections/BrandsAndCollections")
);
const WishlistPage = lazy(() => import("pages/Wishlist/Wishlist"));
const SearchPage = lazy(() => import("pages/Search/Search"));
const BagPage = lazy(() => import("pages/Bag/Bag"));
const CheckoutPage = lazy(() => import("./pages/Checkout/Checkout"));
const ChangePhoneNo = lazy(() => import("pages/ChangePhoneNo/ChangePhoneNo"));
const AboutUs = lazy(() => import("pages/AboutUs/AboutUs"));
const Notification = lazy(() => import("components/Notification/Notification"));
const ForgotPassword = lazy(() =>
  import("pages/ForgotPassword/ForgotPassword")
);
const ContactUs = lazy(() => import("pages/ContactUs/ContactUs"));

// admin page
const AdminHomePage = lazy(() => import("./admin/pages/Home/Home"));

class App extends React.Component {
  unSubscribeFromAuth = null;

  clearUserOrdersListener = () => {
    const { unSubscribeUserOrdersMethod, setUnSubscribeUserOrdersMethod } =
      this.props;
    if (unSubscribeUserOrdersMethod) {
      unSubscribeUserOrdersMethod();
      setUnSubscribeUserOrdersMethod(undefined);
    }
  };

  componentDidMount() {
    const {
      setCurrentUser,
      setUnSubscribeUserOrdersMethod,
      unSubscribeUserOrdersMethod,
    } = this.props;
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // if user is logged in
        const user = await createUserProfileDoc(userAuth);
        setCurrentUser(user); // set to redux user
      } else {
        setCurrentUser(userAuth);
        this.clearUserOrdersListener();
      }
    });
    // unsubscribe listeners on refresh
    window.onbeforeunload = () => {
      if (unSubscribeUserOrdersMethod) {
        unSubscribeUserOrdersMethod();
        setUnSubscribeUserOrdersMethod(undefined);
      }
      this.unSubscribeFromAuth();
    };
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
    this.clearUserOrdersListener();
  }

  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <div>
        <GlobalStyle />
        <Navbar />
        <ErrorBoundry>
          <Suspense
            fallback={
              <LoadingSpinner
                placeCenter
                hasLoadingText
                displayText="Loading Page"
              />
            }
          >
            <Notification />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route
                path="/users/:signInOrSignUp"
                component={SignInAndSignUp}
              />
              <RestrictedRoute
                path="/checkout/:checkoutOption"
                component={CheckoutPage}
              />
              <Route
                exact
                path="/user/change/password"
                component={ForgotPassword}
              />
              <RestrictedRoute
                exact
                path="/user/change/phoneno"
                component={ChangePhoneNo}
              />
              <RestrictedRoute
                exact
                path="/user/wishlist"
                component={WishlistPage}
              />
              <RestrictedRoute exact path="/user/bag" component={BagPage} />
              <RestrictedRoute
                path="/user/:profileOrOrders"
                component={ProfileAndOrders}
              />
              <Route path="/search" component={SearchPage} />
              <Route path="/:listName/all" component={BrandsAndCollections} />
              <Route path="/items/:itemId/preview" component={ItemPreview} />
              <Route path="/aboutus" component={AboutUs} />
              <Route path="/contactus" component={ContactUs} />
              <RestrictedRoute
                isAdminRoute
                path="/admin/:currentPage"
                component={AdminHomePage}
              />
            </Switch>
            {pathname.split("/")[1] !== "admin" && <Footer />}
          </Suspense>
        </ErrorBoundry>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  unSubscribeUserOrdersMethod: selectUnSubscribeUserOrdersMethod,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setUnSubscribeUserOrdersMethod: (unSubscribeMethod) =>
    dispatch(setUnSubscribeUserOrdersMethod(unSubscribeMethod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(materialUiGlobalStyles)(withRouter(App)));
