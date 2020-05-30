const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authenticate');
const companyNormalController = require("../../controllers/normalController/companynormalcontroller");

router.get('/allcompanies', authenticate, companyNormalController.allCompanies);

router.get('/company/create', authenticate, companyNormalController.createCompany);

router.get('/company/read/:companyId', authenticate, companyNormalController.readCompany);

module.exports = router