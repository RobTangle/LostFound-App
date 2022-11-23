//check if user existe en db
import { URL } from "../constants/url";


export async function userExist(user, isAuthenticated, navigate, getAccessTokenSilently) {

  const claims = await getAccessTokenSilently();
  localStorage.setItem("token", claims);
  try
  {

    if (isAuthenticated && user)
    {
      console.log("estoypor hacer la peticion");
      let existe = await fetch(
        URL + "user/existsInDB/00000001primerpUserID"
        // {
        //   headers: {
        //     Authorization: `Bearer ${claims}`,
        //   },
        // }
      )
        .then((response) => response.json())
      if (existe.msg)
      {
        navigate("/home");
      }
      if (existe.msg === false)
      {
        navigate("/register");
      }
    }
  } catch (error)
  {
    console.log(`Error en el Login Button`);
    console.log(error);
  }

}