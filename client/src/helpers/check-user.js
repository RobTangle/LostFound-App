//check if user existe en db
import { URL_EXISTS_IN_DB } from "../constants/url";
import accessTokenName from "../constants/accessToken";

export async function userExist(
  user,
  isAuthenticated,
  navigate,
  getAccessTokenSilently
) {
  const claims = await getAccessTokenSilently();
  // console.log("Claims = ", claims);
  localStorage.setItem(accessTokenName, claims);
  try {
    console.log("URL_EXISTS_IN_DB = ", URL_EXISTS_IN_DB);
    if (isAuthenticated && user) {
      let exist = await fetch(
        URL_EXISTS_IN_DB, // El user_id va por Token:
        {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        }
      ).then((response) => response.json());
      // console.log("exist = ", exist);
      if (exist.msg) {
        navigate("/home");
      }
      if (exist.msg === false) {
        navigate("/register");
      }
    }
  } catch (error) {
    // console.log(`Error en el Login Button`);
    // console.log("error message = ", error.message);
    console.log(error);
  }
}
