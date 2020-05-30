const Company = require("../../model/Company");
const dotenv = require("dotenv");
dotenv.config()

const DOMAIN_NAME = process.env.DOMAIN_NAME || "http://localhost:1234/"

module.exports = {
    createCompany: function(req, res) {
        const employee = req.employee;
        const company = new Company({ ...req.body });

        company.owner = employee._id;

        employee.companiesOwned.push(company._id);

        company.employees.push(employee._id)

        employee.save().then(function(employee){
            console.log("employee created a company");
        })
        .catch(function(err){
            if (err.name === 'ValidationError') return res.status(400).send(`Validation Error: ${err.message}`);
            console.log(err);
            return res.status(500).send('Server Error');
        })

        company.save().then(function(comp){
            console.log('saved successfully');
            return res.redirect('/dashboard');
        })
        .catch(function(err){
            console.log(err.message);
            return res.status(500).send('Server Error');
        })

    }


}