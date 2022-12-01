import { landing } from "./landing";
import { searchForm } from "./searchForm";
import { home } from "./home";
import { postForm } from "./postForm";
import { registerForm } from "../esp/registerForm";
import { subscriptionForm } from "./subscriptionForm";
import { navbar } from "./navbar";
import { profile } from "./profile";
import { error } from "./error404";

export const esp = {
  home: home,
  landing: landing,
  searchForm: searchForm,
  postForm: postForm,
  registerForm: registerForm,
  subscriptionForm: subscriptionForm,
  navbar: navbar,
  profile: profile,
  error:error
};
