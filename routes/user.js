const router = require('express').Router();
const {userSignup, userSignin, userLogOut, activeUser} = require('../controller/user');
const { loginCheck } = require('../auth/auth');


router.get(`/${process.env.NODE_ENV}/signup`, (req, res)=> {
    res.send(`Api works from ${process.env.NODE_ENV}`)
});
router.post(`/${process.env.NODE_ENV}/signup`, userSignup);
router.post(`/${process.env.NODE_ENV}/signin`, userSignin);
router.get(`/${process.env.NODE_ENV}/logout`,loginCheck, userLogOut);

router.post(`/${process.env.NODE_ENV}/active`, activeUser);





module.exports = router;