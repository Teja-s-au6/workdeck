const Employee = require("../../model/Employee");
const Company = require("../../model/Company");

module.exports = {
    renderRegisterPage: function(req, res) {
        res.render('register', {
            title: 'Register page'
        })
    },

    renderLoginPage: function(req,res) {
        res.render('login',{
            title: 'Login page'
        })
    },

    getemployee: function(req, res) {
        const employee = req.employee;
        Employee.find({ _id: req.employee._id}).populate('companiesOwned')
                    .then(function(details) {
                        companiees = details[0].companieesOwned
                        return res.render('dashboard', {
                            employeeId: req.session.employeeId,
                            name: req.employee.name,
                            details: details
                        })
                    })
                    .catch(function(err) {
                        console.log(err.message);
                        return res.status(500).send('Server error');
                    });
    },

    updateProfile: function(req, res) {
        var employee = req.employee;
        
        Employee.find({employee: req.employee._id})
                    .then(function(profile) {
                        res.render('profileupdate', {
                            title: "Profile Update Page",
                            employeeId: req.session.employeeId,
                            employeeId: employee.id,
                            profile: profile
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).send(`Server Error hi ${err.message}`);
                    });
    }
}