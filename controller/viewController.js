const cathAsynce = require('./../utils/catchAsync');
const authController = require('./../controller/authController');

exports.indexPage = cathAsynce(async (req, res, next) => {
    if (req.user) {
        res.status(200).set({ auth: true }).render('v0/message');
    } else {
        // console.log(await authController.isloggedIn)
        res.status(200).set({ auth: false }).render('v0/login');
    }

});
exports.logout = cathAsynce(async (req, res, next) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
    });
    res.redirect('/');

});