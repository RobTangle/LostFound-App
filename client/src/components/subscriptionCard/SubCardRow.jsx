import { useDispatch } from "react-redux";
import accessToken from "../../constants/accessToken";
import { parseDateWithNoHours } from "../../helpers/dateParsers";
import { deleteSubscription } from "../../redux/features/subscription/subscriptionThunk";
import { useAuth0 } from "@auth0/auth0-react";
import { BiEditAlt } from "react-icons/bi";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";

export function SubCardRow({ subscription }) {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  async function handleDeleteSubscription(e) {
    let token = localStorage.getItem(accessToken);
    if (!token) {
      token = await getAccessTokenSilently();
    }
    dispatch(deleteSubscription(e.target.id, token));
  }

  async function handleEditSubscription(e) {
    alert(
      "Si no hacés la función para editar la suscripción.. este botón está de adorno!"
    );
    // let token = localStorage.getItem(accessToken);
    // if (!token) {
    //   token = await getAccessTokenSilently();
    // }
  }
  return (
    <tr key={subscription._id}>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {subscription.name_on_doc}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {subscription.number_on_doc}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {subscription.country_lost}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {parseDateWithNoHours(subscription.date_lost)}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
        {/* <button
          className="mx-3"
          id={subscription._id}
          onClick={handleDeleteSubscription}
        >
          X
        </button>
        <button id={subscription._id} onClick={handleEditSubscription}>
          <BiEditAlt />
        </button> */}
        <ButtonGroup
          id={subscription._id}
          handleDelete={handleDeleteSubscription}
          handleEdit={handleEditSubscription}
        />
      </td>
    </tr>
  );
}
