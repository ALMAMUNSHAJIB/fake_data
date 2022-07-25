const router = require('express').Router();
const {createUserController, getAllUserController, updateFiledController, getSinglaUserController, updateUserById, removeUserById} = require('../controller/dummy-user');


router.get('/get-user', getAllUserController);
router.post('/create-user', createUserController);
router.put('/update', updateFiledController);
router.post('/singla-user/:userId', getSinglaUserController);
router.post('/user-update/:userId', updateUserById);
router.delete('/:userId', removeUserById)


module.exports = router;