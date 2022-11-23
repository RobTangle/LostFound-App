//check if user existe en db
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { URL } from "../constants/url";



export async function userExist(user, isAuthenticated) {
  const {
    getAccessTokenSilently,
  } = useAuth0();
  try
  {
    const claims = await getAccessTokenSilently();
    localStorage.setItem("tokenCattleTracker", claims);
    if (isAuthenticated && user)
    {
      console.log("estoypor hacer la peticion");
      let existe = await fetch(
        URL + "user/existsInDB/00000001primerUserID"
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