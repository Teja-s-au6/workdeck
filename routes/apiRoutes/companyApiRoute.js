const express = require("express");
const companyApiControllers = require("../../controllers/apiController/companycontroller");
const authenticate = require("../../middleware/authenticate");

const router = express.Router()

router.post('/company/create', authenticate, companyApiControllers.createCompany);

module.exports = router