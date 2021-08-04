import React, { Fragment, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/* Components */
import Header from "./components/Layout/Header";
import Navbar from "./components/Layout/Navbar";
import LoginFooter from "./components/Login/LoginFooter";
import ContactHouserOK from "./components/Services/Housers/ContactHouserOK";

/* Pages */
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import LookForHousersPage from "./pages/LookForHousersPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ChangeAddressPage from "./pages/ChangeAddressPage";
import ChangeAvatarPage from "./pages/ChangeAvatarPage";
import HouserInfoPage from "./pages/HouserInfoPage";
import ContactHouserPage from "./pages/ContactHouserPage";
import NotificationChatPage from "./pages/NotificationChatPage";
import OrdersHistoryPage from "./pages/OrdersHistoryPage";

/* Services */
import AuthService, { AuthContext } from "./services/User/User-service";
import { ToastContextProvider } from "./contexts/toast-context";

/* Styles */
import "./App.css";
import BurgerMenu from "./components/Layout/BurgerMenu";
import Ad from "./components/Ads/Ad";
import ChangeTelephone from "./components/Profile/EditProfile/ChangeTelephone";


function App() {
  const [auth, setAuth] = useState(AuthService.getLoggedUser());
  const [showSidebar, setShowSidebar] = useState(false);

  /* const authCtx = useContext(AuthContext); */
  const userIsLogged = AuthService.isLogged();

  const showCartHandler = (open) => {
    setShowSidebar(open);
  };
  const closeCartHandler = (close) => {
    setShowSidebar(close);
  };

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          user: auth,
          updateAuthState(data) {
            setAuth(data);
          },
        }}
      >
        <div className="content">
        <ToastContextProvider>
            {showSidebar && <BurgerMenu onCloseSidebar={closeCartHandler} />}
            <Header onOpenSidebar={showCartHandler} />
            <Switch>
              <Route path="/ad/:houserId/:serviceId" exact>
                {userIsLogged && <Ad />}
                {!userIsLogged && <LoginPage />}
              </Route>
              <Route path="/login" exact>
                {userIsLogged && <Redirect to="/" />}
                {!userIsLogged && <LoginPage />}
              </Route>
              <Route path="/sign-up" exact>
                {userIsLogged && <Redirect to="/home" />}
                {!userIsLogged && <SignUpPage />}
              </Route>
              <Route path="/" exact>
                {userIsLogged && <Redirect to="/home" />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/home">
                {userIsLogged && <HomePage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/profile" exact>
                {userIsLogged && <ProfilePage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/profile/change-password">
                {userIsLogged && <ChangePasswordPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/profile/change-address">
                {userIsLogged && <ChangeAddressPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/profile/change-telephone">
                {userIsLogged && <ChangeTelephone />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/profile/change-avatar">
                {userIsLogged && <ChangeAvatarPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/notifications/" exact>
                {userIsLogged && <NotificationsPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/notifications/chat/:orderId" exact>
                {userIsLogged && <NotificationChatPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/services/:serviceId">
                {userIsLogged && <LookForHousersPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/houser/:houserId/:serviceId" exact>
                {userIsLogged && <HouserInfoPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/contact-houser/:houserId/:serviceId" exact>
                {userIsLogged && <ContactHouserPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/contact-houser/ok" exact>
                {userIsLogged && <ContactHouserOK />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
              <Route path="/orders-history" exact>
                {userIsLogged && <OrdersHistoryPage />}
                {!userIsLogged && <Redirect to="/login" />}
              </Route>
            </Switch>
          </ToastContextProvider>
        </div>  
        {userIsLogged && <Navbar />}
        {!userIsLogged && <LoginFooter />}
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
