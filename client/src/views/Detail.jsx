import React from "react";
import { PostDetail } from "../components/PostDetail/PostDetail";
import NavBar from "../components/NavBar/Navbar";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import accessTokenName from "../constants/accessToken";
import {
  fetchPostDetail,
  resetPostDetail,
} from "../redux/features/post/postThunk";

export function Detail() {
  const params = useParams();
  const { post_id } = params;
  const dispatch = useDispatch();
  const postDetail = useSelector((state) => state.post.postDetail);
  const accessToken = localStorage.getItem(accessTokenName);
  React.useEffect(() => {
    dispatch(fetchPostDetail(post_id, accessToken));
    return () => {
      dispatch(resetPostDetail());
    };
  }, [post_id, accessToken]);

  return (
    <div>
      <NavBar />
      <div className="mx-auto relative">
        <PostDetail post={postDetail} />
      </div>
      <Footer />
    </div>
  );
}
