const router = require('express').Router()
const { Router } = require('express')

const {upload} = require('../Middlewares/multer')
const { register, verifyUser, resendCode, login, forgotPassword, resetPassword, updatePassword, logOut, socialLogin } = require('../Controllers/authController')
const { verifyToken } = require('../Middlewares/authentication')
const { profileSetup, userDetail, updateUser } = require('../Controllers/userController')
const { getContent, notificationOnOff } = require('../Controllers/commonController')
const { getContacts, blockUnblock, favouriteUnfavourite, getBlockedContacts, getFavouriteContacts, updatePreference, contacts } = require("../Controllers/contactController");





//Authentication
router.post('/register', register)
router.post('/verifyUser', verifyUser)
router.post('/resendCode', resendCode)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/updatePassword', verifyToken, updatePassword)
router.post('/logOut', verifyToken, logOut)
router.post('/socialLogin', socialLogin)


//Content
router.get('/get-content/:type', getContent);

router.post('/notification', verifyToken, notificationOnOff)



//User Controller
router.post('/profileSetup', upload.single('profilePicture'), profileSetup)
router.get('/userDetail',verifyToken, userDetail)
router.post('/updateUser',verifyToken, upload.single('profilePicture'), updateUser)



//Contacts Controller
router.post('/addContacts', verifyToken, contacts);
router.get("/getContacts", verifyToken, getContacts);
router.post("/blockUnblock", verifyToken, blockUnblock);
router.get("/getBlockedContacts", verifyToken, getBlockedContacts);
router.post("/favouriteUnfavourite", verifyToken, favouriteUnfavourite);
router.get("/getFavouriteContacts", verifyToken, getFavouriteContacts);
router.post('/addpreferences', verifyToken, updatePreference)


module.exports = router;