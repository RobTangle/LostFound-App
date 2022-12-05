import React, { useState, useEffect } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/features/user/userThunk";
import { searchPost } from "../../redux/features/post/postThunk";
import { searchFormValidator } from "../../helpers/search-form-validation";
import { parseDateToSetMaxDate } from "../../helpers/dateParsers";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

const SearchForm = () => {
  const countries = useSelector((state) => state.user.countries);
  const results = useSelector((state) => state.post.searchResults);
  const dispatch = useDispatch();
  const currentLang = i18next.language.slice(0, 2);
  const { t } = useTranslation();
  const { getAccessTokenSilently } = useAuth0();

  const [search, setSearch] = useState({
    name: "",
    number: "",
    country: "",
    date_lost: "",
  });

  const maxDateAllowed = parseDateToSetMaxDate();

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = searchFormValidator(search, t);
    if (validation.error) {
      // RENDER ERROR MESSAGE
    Swal.fire({
        title: "Error",
        text: `${validation.error}`,
        icon: "warning",
        confirmButtonColor: "#2676fc",
        confirmButtonText: "OK",
      });
      console.log("ERROR AL VALIDAR SEARCH = ", validation);
    } else {
      if (validation === true) {
        const accessToken = await getAccessTokenSilently();
        dispatch(searchPost(search, accessToken));
      }
    }
  };
  useEffect(() => {
    console.log("Paises = ", countries.length);
    !countries.length && dispatch(getCountries(currentLang));
  }, [dispatch]);

  return (
    <div className="grid md:flex font-sans md:min-h-[80vh]">
      <div className="grid px-5 py-5 mt-5 md:mt-0 md:flex flex-col justify-center items-center md:justify-start md:items-start md:gap-5 bg-green ">
        <h1 className="text-2xl text-white md:text-5xl md:mt-6 md:ml-8 w-full text-center md:text-start p-2 md:p-0 lg:w-3/4">
          {t("searchForm.title")}
        </h1>
        <p className=" text-white text-medium md:text-xl md:ml-8 w-full text-center md:text-start lg:w-1/2">
          {t("searchForm.subtitle")}
        </p>
      </div>
      <form
        className="w-full mx-auto h-full flex flex-col justify-around md:gap-6 sm:px-6 md:px-2 text-gray font-sans "
        onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-2 gap-2 md:gap-6">
          <div className="w-full  px-3">
            <label
              className=" uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-last-name">
              {t("searchForm.nameLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="name"
              value={search.name}
              type="text"
              placeholder={t("searchForm.namePlaceholder")}
              onChange={handleChange}
            />
          </div>
          <div className="w-full  px-3">
            <label
              className=" uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-last-name">
              {t("searchForm.numberLabel")}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              name="number"
              value={search.number}
              placeholder="10.111.213 | 4544-2222-2222-2222"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2 gap-2 md:gap-6">
          <div className="w-full  px-3">
            <label
              className=" uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-state">
              {t("searchForm.countryLabel")}
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="country"
                required
                onChange={handleChange}>
                <option value="">Select a country</option>
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
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full  px-3">
            <label
              className=" uppercase tracking-wide text-gray-700 text-sm font-bold mt-2 mb-1 grid"
              htmlFor="grid-zip">
              {t("searchForm.dateLabel")}
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
        <div className="w-full lg:w-1/2 px-3 mt-2">
          <button className="w-full bg-gray-200 hover:bg-green hover:text-white px-3 border-b-2 border-green py-2 text-slate-500 transition-all duration-300">
            {t("searchForm.submitButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
