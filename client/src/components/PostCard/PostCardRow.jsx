import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import accessToken from "../../constants/accessToken";
import { BiEditAlt } from "react-icons/bi";
import { parseDateWithNoHours } from "../../helpers/dateParsers";
import { deletePost } from "../../redux/features/post/postThunk";

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

  async function handleEditPost(e) {
    alert(
      "Si no hacés la función para editar el Post.. este botón está de adorno!"
    );
    // let token = localStorage.getItem(accessToken);
    // if (!token) {
    //   token = await getAccessTokenSilently();
    // }
  }

  return (
    <tr key={post._id}>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {post.name_on_doc}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {post.number_on_doc}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {post.country_found}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {parseDateWithNoHours(post.date_found)}
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {post.comments}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {post.user_posting.additional_contact_info}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <img src={post.blurred_imgs[0] || null} alt="Doc image" />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        <button className="mx-3" id={post._id} onClick={handleDeletePost}>
          X
        </button>
        <button id={post._id} onClick={handleEditPost}>
          <BiEditAlt />
        </button>
      </td>
    </tr>
  );
}
