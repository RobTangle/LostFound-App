//function to check if user is logged in
import { useAuth0 } from "@auth0/auth0-react";
export function checkLogin() {
  console.log("estoy en helper check login")
  const { isAuthenticated, isLoading } = useAuth0();
  if (!isLoading && isAuthenticated)
  {
    console.log('true')
    return true;
  } else
  {
    console.log('false')
    return false;
  }
}