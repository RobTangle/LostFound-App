import { useTranslation } from "react-i18next";
import { parseDateWithNoHours } from "../../helpers/dateParsers";
import { useDispatch } from "react-redux";
import { contactPostOwnerWithSwal } from "../../redux/features/post/postThunk";
import accessTokenName from "../../constants/accessToken";

export function PostDetail({ post }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleContactPostOwner(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(accessTokenName);
    dispatch(contactPostOwnerWithSwal(post._id, accessToken, t));
  }

  return (
    <div>
      <section>
        <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <img
                alt="Les Paul"
                src={
                  post?.blurred_imgs?.[0] ||
                  "https://thumbs.dreamstime.com/b/hand-holding-id-card-illustration-39652132.jpg"
                }
                className="object-cover w-full aspect-square rounded-xl"
              />

              {/*<div className="grid grid-cols-2 gap-4 lg:mt-4">
                 <img
                  alt="Les Paul"
                  src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="object-cover w-full aspect-square rounded-xl"
                />

                <img
                  alt="Les Paul"
                  src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="object-cover w-full aspect-square rounded-xl"
                /> 
              </div>*/}
            </div>

            <div className="sticky top-0">
              <strong className="uppercase rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                {post?.country_found}
              </strong>

              <div className="flex justify-between mt-8">
                <div className="max-w-[35ch]">
                  <h1 className="text-2xl font-bold">
                    {post?.name_on_doc || "Juan perez con panc"}
                  </h1>

                  <p className="mt-0.5 text-sm">
                    {post?.number_on_doc || "330294855"}
                  </p>
                </div>

                <p className="text-lg font-bold">
                  {t("postDetail.dateFound")}{" "}
                  {parseDateWithNoHours(post?.date_found) || "04-12-2021"}
                </p>
              </div>
              <div className="group relative mt-4">
                <p>{post?.comments || t("postDetail.commentsIfUndefined")}</p>
              </div>
              <form className="mt-8" onSubmit={handleContactPostOwner}>
                <fieldset>
                  {/* <legend className="mb-1 text-sm font-medium">
                    {t("postDetail.contactUser")}
                  </legend> */}

                  <div className="flow-root">
                    <div className="-m-0.5">
                      <div>
                        <p>{t("postDetail.contactUserText")}</p>
                      </div>
                      <button className="w-1/3 bg-gray-200 hover:bg-green hover:text-white px-3 border-b-2 border-green py-2 text-slate-500 transition-all duration-300">
                        {t("postDetail.contactButton")}
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
