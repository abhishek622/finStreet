const User = require("../models").User;

module.exports = {
	list(req, res) {
		User.findAll()
			.then((users) => res.status(200).send(users))
			.catch((error) => res.status(400).send(error));
	},

	getById(req, res) {
		User.findByPk(req.params.id)
			.then((user) => res.status(200).send(user))
			.catch((error) => res.status(400).send(error));
	},

	create(req, res) {
		User.create({
			user_name: req.body.user_name,
			user_email: req.body.user_email,
			user_password: req.body.user_password,
			user_image: req.body.user_image,
			total_orders: req.body.total_orders,
		})
			.then((user) => res.status(200).send(user))
			.catch((error) => res.status(400).send(error));
	},

	update(req, res) {
		User.update(
			{
				user_name: req.body.user_name,
				user_password: req.body.user_password,
				total_orders: req.body.total_orders,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		)
			.then((user) => res.status(200).send("User updated successfully"))
			.catch((error) => res.status(400).send(error));
	},

	delete(req, res) {
		User.destroy({
			where: {
				id: req.params.id,
			},
		})
			.then((user) => res.status(200).send("User deleted successfully"))
			.catch((error) => res.status(400).send(error));
	},
};
