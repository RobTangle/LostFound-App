import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import accessToken from "../../constants/accessToken";

import IDicon80 from "../../assets/IDicon80.png";
import { parseDateWithNoHours } from "../../helpers/dateParsers";
import { deletePost } from "../../redux/features/post/postThunk";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";

import { visualizeImg } from "../../helpers/Swals/visualizeImg";

export function PostCardRow({ post }) {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  async function handleDeletePost(e) {
    let token = localStorage.getItem(accessToken);
    if (!token) {
      token = await getAccessTokenSilently();
    }
    dispatch(deletePost(e.target.id, token));
  }

  return (
    <tr key={Math.random()}>
      <td className="uppercase whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {post.name_on_doc}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {post.number_on_doc}
      </td>
      <td className="uppercase whitespace-nowrap px-4 py-2 text-gray-700">
        {post.country_found}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {parseDateWithNoHours(post.date_found)}
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-gray-700 max-w-xs overflow-x-auto">
        {post.comments}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700 max-w-xs overflow-x-auto">
        {post.user_posting.additional_contact_info}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <img
          src={post.blurred_imgs[0] || IDicon80}
          alt="Doc image"
          onClick={visualizeImg}
          className="cursor-pointer"
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <ButtonGroup
          post={post}
          id={post._id}
          handleDelete={handleDeletePost}
          key={post._id}
        />
      </td>
    </tr>
  );
}
