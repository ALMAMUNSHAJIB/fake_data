const router = require('express').Router();
const {userSignup, userSignin, userSignOut, activeUser, activeUserReportFindById} = require('../controller/user');
const { loginCheck } = require('../auth/auth');


router.get(`/${process.env.NODE_ENV}/signup`, (req, res)=> {
    res.send(`Api works from ${process.env.NODE_ENV}`)
});
router.post(`/${process.env.NODE_ENV}/signup`, userSignup);
router.post(`/${process.env.NODE_ENV}/signin`, userSignin);
router.post(`/${process.env.NODE_ENV}/logout`,loginCheck, userSignOut);

router.post(`/${process.env.NODE_ENV}/active`, activeUser);
router.post(`/${process.env.NODE_ENV}/report`,loginCheck, activeUserReportFindById)




module.exports = router;