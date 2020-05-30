const Employee = require("../../model/Employee");
const Details = require("../../model/Details");
const Company = require("../../model/Company");


module.exports = {
    registerEmployee : function(req,res) {
        var employee = new Employee({...req.body});

        employee.save().then(function(employee){
            req.session.employeeId = employee._id;
            res.redirect('/allCompanies');
        })
        .catch(function(err){
            console.log(err);
            if(err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        });
    },

    loginEmployee : function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        if(!email || !password){
            return res.status(400).send('Incorrect credentials');
        }

        Employee.findByEmailAndPassword(email, password)
            .then(function(employee){
                req.session.employeeId = employee._id;
                res.redirect('/allCompanies');
            })
            .catch(function(err){
                console.log(err.message);
                return res.redirect('/login')
            });
    },

    logoutEmployee : function(req, res) {
        req.session.destroy();
        return res.redirect('/');
    },

    profileUpdate: function(req, res) {
        const employeeId = req.employee.id;
        Employee.updateOne(
            {
                _id: employeeId
            },
            {
                ...req.body
            }
        ).then(function(employee) {
            if (!employee) return res.status(404).send(' Not Found');
            res.redirect('/dashboard');
        })
        .catch(function(err) {
            if (err.name === 'CastError') return res.status(400).send('Invalid ID');
            if (err.name === 'ValidationError') return res.status(400).send(`Validation Error: ${err.message}`);
            return res.status(500).send('Server Error');
        });
    },

    previouswork: function(req, res) {
        const employeeId = req.employee.id;

        Company.find({ }).populate('name')
        .then(function(companies) {
            return res.render('allCompanies', {
                employeeId: req.session.employeeId,
                name: companies.owner,
                companies: companies,
                length: companies.length
            })
        })
        
    }
}