const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  editUserInfo,
  editUserAvatar,
  getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.get('/me', getUser);
router.post('/', createUser);
router.patch('/me', editUserInfo);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
