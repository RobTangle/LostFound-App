import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import i18n from "./i18next";
import { store } from "./redux/app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-4hixku625rb7v8m8.us.auth0.com"
        clientId="YYAxUnBGBjhdEukJB4VSRqbkNsyYRcJi"
        redirectUri={window.location.origin}
        audience="https://lost-found.app"
        useRefreshTokens={true}
        cacheLocation="localstorage">
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
