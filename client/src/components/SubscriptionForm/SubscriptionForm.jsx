import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCountries, getUserInfo } from "../../redux/features/user/userThunk";
import { createSubscription } from "../../redux/features/subscription/subscriptionThunk";
import { subscriptionFormValidator } from "../../helpers/subscriptionFormValidator";
import { validAttr } from "../../helpers/validAttributesObj";
import { parseDateToSetMaxDate } from "../../helpers/dateParsers";
import accessTokenName from "../../constants/accessToken";

const SubscriptionForm = () => {
  const countries = useSelector((state) => state.user.countries);
  const dispatch = useDispatch();
  const currentLang = i18next.language.slice(0, 2);
  const { t } = useTranslation();

  const [suscription, setSuscription] = useState({
    name_on_doc: "",
    number_on_doc: "",
    country_lost: "",
    date_lost: "",
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
      console.log(`Error en la validación: ${validation.error}`);
      errorMessage = validation.error;
    }
    if (validation === true) {
      let accessToken = localStorage.getItem(accessTokenName);
      if (!accessToken) {
        console.log(
          "AccessToken no encontrado en localStorage. Usando getAccessTokenSilently Hook..."
        );
        accessToken = await getAccessTokenSilently();
      }
      console.log("Despachando createSuscription !", suscription);
      dispatch(createSubscription(suscription, accessToken));
      setTimeout(() => {
        dispatch(getUserInfo(accessToken));
      }, 700);
    }
  };

  useEffect(() => {
    !countries.lenght && dispatch(getCountries(currentLang));
  }, [dispatch]);

  // console.log("ACAAA", countries);
  return (
    <div className="grid md:flex">
      <div className="grid">
        <h1 className="text-3xl font-extralight text-neutral-400 md:text-5xl mt-6 md:ml-12 w-full text-center md:text-start p-2 md:p-0 md:w-1/2">
          {t("subscriptionForm.title")}
        </h1>
        <p className="font-extralight text-indigo-400 text-medium md:text-xl md:ml-12 w-full text-center md:text-start md:w-1/2">
          {t("subscriptionForm.subtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto md:m-8 p-4 sm:p-6 md:p-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mb-2 gap-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              {t("subscriptionForm.numberLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"
              id="grid-last-name"
              type="text"
              name="number_on_doc"
              maxLength={validAttr.number_on_doc.maxLength}
              value={suscription.number_on_doc}
              placeholder="10.111.213 | 4544-2222-2222-2222"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              {t("subscriptionForm.countryLostLabel")}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="country_lost"
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
          <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
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
              max={maxDateAllowed}
              name="date_lost"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 px-3">
          <button className="w-full bg-gray-200 hover:bg-emerald-300 hover:text-white border border-emerald-300 rounded py-3 text-slate-500">
            {t("subscriptionForm.submitButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
