import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// components:
import Footer from "../components/Footer/Footer";
import Navbar from "../components/NavBar/Navbar";
import SubscriptionForm from "../components/SubscriptionForm/SubscriptionForm";
import { Subscriptions } from "../components/subscriptionCard/Subscriptions";
import PostForm from "../components/PostForm/PostForm";
import { UserPosts } from "../components/PostCard/UserPosts";
import { SearchComp } from "../components/SearchComp/SearchComp";
//reducer:
import {
  editUserNameWithSwal,
  editUserProfileImgWithSwal,
} from "../redux/features/user/userThunk";
import { getUserInfo } from "../redux/features/user/userThunk";
//helpers:
import { visualizeImgAndEditOptionWithSwal } from "../helpers/Swals/helperFunctionsWithSwal";
import { swalErrorMX } from "../helpers/Swals/Mixins";

export const Profile = () => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const userProfile = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState({
    link1: true,
    link2: false,
    link3: false,
    // link4: false,
    // link5: false,
  });

  useEffect(() => {
    async function getToken() {
      let accessToken = await getAccessTokenSilently();

      if (!accessToken) {
        return navigate("/");
      } else {
        dispatch(getUserInfo(accessToken));
      }
    }

    if (!isLoading && !isAuthenticated) {
      return navigate("/");
    }

    if (!isLoading && isAuthenticated) {
      getToken();
    }
  }, [isLoading]);

  async function handleVisualizeImgAndEditOption() {
    try {
      const accessToken = await getAccessTokenSilently();
      const userImageURL = userProfile?.profile_img;
      visualizeImgAndEditOptionWithSwal(
        userImageURL,
        dispatch,
        editUserProfileImgWithSwal,
        accessToken
      );
    } catch (error) {
      swalErrorMX(error?.message);
    }
  }

  async function handleEditName() {
    try {
      // const accessToken = localStorage.getItem(accessTokenName);
      const accessToken = await getAccessTokenSilently();
      dispatch(editUserNameWithSwal(accessToken));
    } catch (error) {
      console.log(error.message);
    }
  }

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
                className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full bg-gray-500 cursor-pointer"
                onClick={handleVisualizeImgAndEditOption}
              />
              <p className="cursor-text text-xl font-semibold leading-tight">
                {userProfile?.name}
              </p>
              <p className="text-gray-400">{userProfile?.email}</p>
              <p>
                <button
                  className="ml-5 bg-gray-200 hover:bg-blue hover:text-white px-3 border-b-1 border-blue py-2 text-slate-400 transition-all duration-300"
                  onClick={handleEditName}
                >
                  Change name
                </button>
                <button
                  className="ml-5 bg-gray-200 hover:bg-blue hover:text-white px-3 border-b-1 border-blue py-2 text-slate-400 transition-all duration-300"
                  onClick={handleVisualizeImgAndEditOption}
                >
                  Change picture
                </button>
              </p>
            </div>
          </div>
        </div>
        <nav className="flex justify-center text-sm font-medium">
          <a
            href="#1"
            id="1"
            className={
              !tab.link1
                ? "-mb-px border-b border-transparent p-4 hover:text-indigo-500"
                : "-mb-px border-b border-current p-4 text-indigo-500"
            }
            onClick={() =>
              setTab({
                ...tab,
                link1: true,
                link2: false,
                link3: false,
                // link4: false,
                // link5: false,
              })
            }
          >
            {t("profile.link1")}
          </a>

          <a
            href="#2"
            id="2"
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
                // link4: false,
                // link5: false,
              })
            }
          >
            {t("profile.link2")}
          </a>
          <a
            href="#3"
            id="3"
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
                // link4: false,
                // link5: false,
              })
            }
          >
            {t("profile.link3")}
          </a>
        </nav>
        <div hidden={!tab.link2} className="border border-indigo-200 mx-auto">
          <PostForm />
          {/* <div>You have {userProfile?.posts?.length} posts</div> */}
          <h3 className=" text-black text-medium md:text-xl md:ml-8 w-full text-center md:text-start lg:w-1/2">
            {t("profile.yourPosts")}
          </h3>
          <UserPosts />
        </div>
        <div hidden={!tab.link3} className="border border-indigo-200 mx-auto">
          <SearchComp />
        </div>
        <div hidden={!tab.link1} className="border border-indigo-200 mx-auto">
          <SubscriptionForm />
          <div>
            <h3 className=" text-black text-medium md:text-xl md:ml-8 w-full text-center md:text-start lg:w-1/2">
              {t("profile.yourSubscriptions")}
            </h3>
            {/* You have {userProfile?.subscriptions?.length || 0} subscriptions */}
          </div>
          <div>
            <Subscriptions />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
