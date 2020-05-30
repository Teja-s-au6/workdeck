const Company = require("../../model/Company");

module.exports = {
    allCompanies: function(req, res) {
        Company.find({ }).populate('owner', 'name')
        .then(function(companies) {
            return res.render('allCompanies', {
                employeeId: req.session.employeeId,
                name: companies.owner,
                companies: companies,
                length: companies.length
            })
        })
        .catch(function(err) {
			console.log(err.message);
			return res.status(500).send('Server error');
		});
    },

    createCompany: function(req, res) {
        res.render('createCompany', {
            employeeId: req.session.employeeId,
            title: "Company Create Page"
        })
    },

    readCompany: function(req, res) {
        const employee = req.employee;
        const companyId = req.params.companyId;

        Company.findById(companyId).populate('employees')
                    .then(function(details) {
                        console.log(details)
                        res.render('readmore', {
                            title: 'read company',
                            name: details.name,
                            employeeId: req.session.employeeId,
                            employee: details.employees[0].name,
                            owner: details.owner.name
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).send(`Server Error hi ${err.message}`);
                    });
        
    }


}