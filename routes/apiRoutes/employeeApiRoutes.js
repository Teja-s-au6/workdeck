const express = require("express");
const employeeApiController = require("../../controllers/apiController/employeecontroller");
const authenticate = require("../../middleware/authenticate");
const router = express.Router();

router.post('/register', employeeApiController.registerEmployee);

router.post('/login', employeeApiController.loginEmployee);

router.delete('/logout', employeeApiController.logoutEmployee);

router.patch('/profileupdate', authenticate, employeeApiController.profileUpdate);

module.exports = router;