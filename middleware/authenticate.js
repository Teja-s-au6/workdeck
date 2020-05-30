const Employee = require("../model/Employee");

module.exports = function(req, res, next) {
	if (req.session.employeeId) {
		Employee.findById(req.session.employeeId)
			.then(function(employee) {
				req.employee = employee;
				next();
			})
			.catch(function(err) {
				console.log(err.message);
				res.render('/login');
			});
	} else res.redirect('/login');
};