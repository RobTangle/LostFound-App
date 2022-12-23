import { useSelector } from "react-redux";
import { UserPostsCards } from "./UserPostsCards";

export function UserPosts() {
  const userPosts = useSelector((state) => state.user?.userProfile?.posts);

  return (
    <>
      {Array.isArray(userPosts) && userPosts.length === 0 ? (
        <div>
          <h3>No tiene publicaciones</h3>
        </div>
      ) : null}
      {Array.isArray(userPosts) && userPosts.length > 0 ? (
        <UserPostsCards posts={userPosts} />
      ) : null}
    </>
  );
}
