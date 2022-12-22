import { useSelector } from "react-redux";
import { PostsCards } from "./PostsCards";

export function Posts() {
  const userPosts = useSelector((state) => state.user?.userProfile?.posts);

  return (
    <>
      {Array.isArray(userPosts) && userPosts.length === 0 ? (
        <div>
          <h3>No tiene publicaciones</h3>
        </div>
      ) : null}
      {Array.isArray(userPosts) && userPosts.length > 0 ? (
        <PostsCards posts={userPosts} />
      ) : null}
    </>
  );
}
