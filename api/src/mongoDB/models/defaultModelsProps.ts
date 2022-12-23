const defaultProps = {
  user: {
    name: {
      minlength: 2,
      maxlength: 50,
    },
    email: {
      minlength: 6,
      maxlength: 256,
    },

    profile_img: {
      defaultImage:
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
      maxlength: 800,
    },
    contacts: {
      maxlength: 5,
    },
    subscriptions: {
      maxlength: 5,
    },
  },
  post: {
    name_on_doc: {
      minlength: 3,
      maxlength: 100,
    },
    number_on_doc: {
      maxlength: 100,
    },
    comments: {
      maxlength: 800,
    },
    additional_contact_info: {
      maxlength: 150,
    },
  },
  subscription: {
    name_on_doc: {
      minlength: 3,
      maxlength: 100,
    },
    number_on_doc: {
      maxlength: 100,
    },
  },
};
export default defaultProps;
