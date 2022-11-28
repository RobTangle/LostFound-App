//check if user existe en db
import { URL_EXISTS_IN_DB } from "../constants/url";

export async function userExist(
  user,
  isAuthenticated,
  navigate,
  getAccessTokenSilently
) {
  const claims = await getAccessTokenSilently();
  localStorage.setItem("token", claims);
  try {
    console.log(user?.sub);
    if (isAuthenticated && user) {
      console.log("estoypor hacer la peticion");
      let existe = await fetch(
        URL_EXISTS_IN_DB, //! cambiar esto ya que cambié la ruta. El user_id va por Token:
        {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        }
      ).then((response) => response.json());
      if (existe.msg) {
        navigate("/home");
      }
      if (existe.msg === false) {
        navigate("/register");
      }
    }
  } catch (error) {
    console.log(`Error en el Login Button`);
    console.log(error);
  }
}
