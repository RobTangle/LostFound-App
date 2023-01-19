import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/features/user/userThunk";
import { editSubscription } from "../../redux/features/subscription/subscriptionThunk";
import { subscriptionFormValidator } from "../../helpers/subscriptionFormValidator";
import { validAttr } from "../../helpers/validAttributesObj";
import { parseDateToSetMaxDate } from "../../helpers/dateParsers";
import accessTokenName from "../../constants/accessToken";
import Swal from "sweetalert2";

export const SubscriptionEditForm = ({ subscription }) => {
  const countries = useSelector((state) => state.user.countries);
  const dispatch = useDispatch();
  const currentLang = i18next.language.slice(0, 2);
  const { t } = useTranslation();

  const [suscription, setSuscription] = useState({
    name_on_doc: subscription?.name_on_doc || "",
    number_on_doc: subscription?.number_on_doc || "",
    country_lost: subscription?.country_lost || "",
    date_lost: subscription?.date_lost?.split("T")[0] || "",
  });

  const maxDateAllowed = parseDateToSetMaxDate();

  // MENSAJE DE ERROR AL SUBMITEAR :
  let errorMessage = "";
  const handleChange = (e) => {
    setSuscription({
      ...suscription,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = subscriptionFormValidator(suscription, t);
    if (validation.error) {
      errorMessage = validation.error;
      // RENDER ERROR MESSAGE
      Swal.fire({
        title: "Error",
        text: `${validation.error}`,
        icon: "warning",
        confirmButtonColor: "#2676fc",
        confirmButtonText: "OK",
      });
    }
    if (validation === true) {
      let accessToken = localStorage.getItem(accessTokenName);
      if (!accessToken) {
        accessToken = await getAccessTokenSilently();
      }
      dispatch(
        editSubscription(
          suscription,
          subscription._id,
          accessToken,
          setSuscription,
          t
        )
      );
    }
  };

  useEffect(() => {
    !countries.lenght && dispatch(getCountries(currentLang));
  }, [dispatch]);

  return (
    <div className="grid md:flex font-sans md:min-h-[80vh]">
      <div className="grid px-5 py-5 mt-5 md:mt-0 md:flex flex-col justify-center items-center md:justify-start md:items-start md:gap-5 bg-goldenrod ">
        <h1 className="text-2xl text-white md:text-5xl md:mt-6 md:ml-8 w-full text-center md:text-start p-2 md:p-0 lg:w-3/4">
          {t("subscriptionForm.editTitle")}
        </h1>
        <p className=" text-white text-medium md:text-xl md:ml-8 w-full text-center md:text-start lg:w-1/2">
          {t("subscriptionForm.editSubtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto h-full flex flex-col justify-around md:gap-6 sm:px-6 md:px-2 text-gray font-sans "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mb-2 gap-2 md:gap-6">
          <div className="w-full px-3">
            <label
              className="uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-last-name"
            >
              {t("subscriptionForm.nameLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="name_on_doc"
              value={suscription.name_on_doc}
              maxLength={validAttr.name_on_doc.maxLength}
              type="text"
              placeholder={t("subscriptionForm.namePlaceholder")}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full  px-3">
            <label
              className="uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-last-name"
            >
              {t("subscriptionForm.numberLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              name="number_on_doc"
              maxLength={validAttr.number_on_doc.maxLength}
              value={suscription?.number_on_doc}
              placeholder="10.111.213 | 4544-2222-2222-2222"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2 gap-2 md:gap-6">
          <div className="w-full  px-3">
            <label
              className="uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-state"
            >
              {t("subscriptionForm.countryLostLabel")}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="country_lost"
                value={suscription?.country_lost}
                required
                onChange={handleChange}
              >
                <option value="">{t("subscriptionForm.selectCountry")}</option>
                {countries.length &&
                  countries.map((c) => (
                    <option value={c[0]} key={c[0]}>
                      {c[1]}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full  px-3">
            <label
              className="uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-zip"
            >
              {t("subscriptionForm.dateLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="date"
              required
              min="1971-01-01"
              value={suscription?.date_lost}
              max={maxDateAllowed}
              name="date_lost"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 px-3 mt-2">
          <button className="w-full bg-gray-200 hover:bg-goldenrod hover:text-white px-3 border-b-2 border-goldenrod py-2 text-slate-500 transition-all duration-300">
            {t("subscriptionForm.editSubmitButton")}
          </button>
        </div>
      </form>
    </div>
  );
};
