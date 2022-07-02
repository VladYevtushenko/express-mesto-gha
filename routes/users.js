const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidation } = require('../utils/urlValidation');

const {
  getUser,
  getUsers,
  getUserId,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex(),
    }),
  }),
  getUserId,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  editUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(urlValidation),
    }),
  }),
  editUserAvatar,
);

module.exports = router;
