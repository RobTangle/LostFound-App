import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../redux/features/user/userThunk";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import SearchForm from "../components/SearchForm/SearchForm";
import Navbar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";

import accessTokenName from "../constants/accessToken";
import SubscriptionForm from "../components/SubscriptionForm/SubscriptionForm";
import { Subscriptions } from "../components/subscriptionCard/Subscriptions";

export const Profile = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const userProfile = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [tab, setTab] = useState({
    link1: true,
    link2: false,
    link3: false,
    link4: false,
  });

  useEffect(() => {
    async function getTokenAndDispatchGetUserInfo() {
      let accessToken = localStorage.getItem(accessTokenName);
      if (!accessToken) {
        console.log(
          "AccessToken no encontrado en localStorage. Usando getAccessTokenSilently Hook..."
        );
        accessToken = await getAccessTokenSilently();
      }
      dispatch(getUserInfo(accessToken));
    }
    if (!userProfile.email) {
      console.log("!userProfile. Invocando getTokenAndDispatchGetUserInfo()");
      getTokenAndDispatchGetUserInfo();
    }
    console.log("El userProfile existe...");
  }, []);

  console.log("user =", user);
  console.log("userProfile = ", userProfile);

  return (
    <div>
      <Navbar />
      <section className="py-6 bg-gray-800 text-gray-100">
        <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
          <div className="flex flex-row flex-wrap-reverse justify-center">
            <div className="flex flex-col justify-center m-8 text-center">
              <img
                src={userProfile?.profile_img}
                alt="user image"
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500"
              />
              <p className="text-xl font-semibold leading-tight">
                {userProfile?.name}
              </p>
              <p className="text-gray-400">{userProfile?.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex justify-center text-sm font-medium">
          <a
            href="#"
            className={
              tab.link1
                ? "-mb-px border-b border-current p-4 text-indigo-500"
                : "-mb-px border-b border-transparent p-4 gover:text-indigo-500"
            }
            onClick={() =>
              setTab({
                ...tab,
                link1: true,
                link2: false,
                link3: false,
                link4: false,
              })
            }
          >
            {t("profile.link1")}
          </a>

          <a
            href="#"
            className={
              !tab.link2
                ? "-mb-px border-b border-transparent p-4 hover:text-indigo-500"
                : "-mb-px border-b border-current p-4 text-indigo-500"
            }
            onClick={() =>
              setTab({
                ...tab,
                link1: false,
                link2: true,
                link3: false,
                link4: false,
              })
            }
          >
            {t("profile.link2")}
          </a>

          <a
            href="#"
            className={
              !tab.link3
                ? "-mb-px border-b border-transparent p-4 hover:text-indigo-500"
                : "-mb-px border-b border-current p-4 text-indigo-500"
            }
            onClick={() =>
              setTab({
                ...tab,
                link1: false,
                link2: false,
                link3: true,
                link4: false,
              })
            }
          >
            {t("profile.link3")}
          </a>

          <a
            href="#"
            className={
              !tab.link4
                ? "-mb-px border-b border-transparent p-4 hover:text-indigo-500"
                : "-mb-px border-b border-current p-4 text-indigo-500"
            }
            onClick={() =>
              setTab({
                ...tab,
                link1: false,
                link2: false,
                link3: false,
                link4: true,
              })
            }
          >
            {t("profile.link4")}
          </a>
        </nav>

        <div hidden={!tab.link1} className="border border-indigo-200 mx-auto">
          <h1>GENERAL</h1>
        </div>
        <div hidden={!tab.link2} className="border border-indigo-200 mx-auto">
          POSTS
        </div>
        <div hidden={!tab.link3} className="border border-indigo-200 mx-auto">
          <SearchForm />
        </div>
        <div hidden={!tab.link4} className="border border-indigo-200 mx-auto">
          <SubscriptionForm />
          <div>You have {userProfile?.subscriptions?.length} subscriptions</div>
          <div>
            <Subscriptions />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
