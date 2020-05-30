const express = require('express');
const router = express.Router();
const employeeNormalController = require("../../controllers/normalController/employeenormalcontroller");
const authenticate = require('../../middleware/authenticate');


router.get('/register', employeeNormalController.renderRegisterPage);

router.get('/login', employeeNormalController.renderLoginPage);

router.get('/dashboard', authenticate, employeeNormalController.getemployee);

router.get('/profileupdate', authenticate, employeeNormalController.updateProfile);

module.exports = router;