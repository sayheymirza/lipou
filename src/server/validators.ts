import Validator from 'fastest-validator';

const validator = new Validator();

export default {
  admin: {
    create: validator.compile({
      fullname: { type: 'string', min: 3, max: 255 },
      username: { type: 'string', min: 3, max: 255 },
      password: { type: 'string', min: 8, max: 255 },
    }),
    login: validator.compile({
      username: { type: 'string', min: 3, max: 255 },
      password: { type: 'string', min: 8, max: 255 },
    }),
  },
};
