"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send_contact_info_to_users_1 = require("./send-contact-info-to-users");
const alert_after_new_post_1 = require("./alert-after-new-post");
const nodeMailerServices = {
    alertUsersAfterNewPost: alert_after_new_post_1.alertUsersAfterNewPost,
    sendContactInfoEmailToBothUsers: send_contact_info_to_users_1.sendContactInfoEmailToBothUsers,
};
exports.default = nodeMailerServices;
