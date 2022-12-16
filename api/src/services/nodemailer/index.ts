import { sendContactInfoEmailToBothUsers } from "./send-contact-info-to-users";
import { alertUsersAfterNewPost } from "./alert-after-new-post";

const nodeMailerServices = {
  alertUsersAfterNewPost,
  sendContactInfoEmailToBothUsers,
};

export default nodeMailerServices;
