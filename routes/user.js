const router = require('express').Router();
const {createUserController, getAllUserController, updateFiledController, getSinglaUserController, updateUserById, removeUserById} = require('../controller/user');


router.get('/get-user', getAllUserController);
router.post('/create-user', createUserController);
router.put('/update', updateFiledController);
router.get('/singla-user/:userId', getSinglaUserController);
router.post('/user-update/:userId', updateUserById);
router.delete('/:userId', removeUserById)


module.exports = router;