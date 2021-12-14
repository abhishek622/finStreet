const Admin = require("../models").Admin;

module.exports = {
	list(req, res) {
		Admin.findAll()
			.then((admins) => res.status(200).send(admins))
			.catch((error) => res.status(400).send(error));
	},

	getAdminByUsername(req, res) {
		Admin.findOne({ where: { admin_name: req.params.admin_name } })
			.then((admin) => res.status(200).send(admin))
			.catch((error) => res.status(400).send(error));
	},

	createAdmin(req, res) {
		Admin.create({
			admin_name: req.body.admin_name,
			admin_email: req.body.admin_email,
			admin_password: req.body.admin_password,
		})
			.then((admin) => res.status(201).send(admin))
			.catch((error) => res.status(400).send(error));
	},

	delete(req, res) {
		Admin.destroy({
			where: {
				id: req.params.id,
			},
		})
			.then((user) => res.status(200).send("Admin deleted successfully"))
			.catch((error) => res.status(400).send(error));
	},
};
