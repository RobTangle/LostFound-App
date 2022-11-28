// VALID ATTRIBUTES :
export const validAttr = {
  // POST / FIND :
  name_on_doc: {
    maxLength: 60,
    minLength: 3,
  },
  number_on_doc: {
    maxLength: 50,
    minLength: 3,
  },
  comments: {
    maxLength: 800,
    minLength: 0,
  },
  // USER PROFILE :
  email: {
    maxLength: 100,
    minLength: 6,
  },
  name: {
    maxLength: 50,
    minLength: 2,
  },
};
