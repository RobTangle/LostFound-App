import { useSelector } from "react-redux";
import { UserPostsCards } from "./UserPostsCards";
import { useTranslation } from "react-i18next";

export function UserPosts() {
  const userPosts = useSelector((state) => state.user?.userProfile?.posts);
  const { t } = useTranslation();
  return (
    <>
      {Array.isArray(userPosts) && userPosts.length === 0 ? (
        <div>
          <h3>{t("postDetail.noPosts")}</h3>
        </div>
      ) : null}
      {Array.isArray(userPosts) && userPosts.length > 0 ? (
        <UserPostsCards posts={userPosts} />
      ) : null}
    </>
  );
}
