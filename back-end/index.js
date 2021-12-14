const express = require("express");
const cors = require("cors");
const userController = require("./src/controllers").userController;
const adminController = require("./src/controllers").adminController;

const app = express();

const port = 5000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a catch-all route for testing the installation.
app.get("/", (req, res) =>
	res.status(200).send({
		message: "Hello World!",
	})
);

app.get("/user", userController.list);
app.get("/user/:id", userController.getById);
app.post("/user/create", userController.create);
app.put("/user/:id", userController.update);
app.delete("/user/:id", userController.delete);

app.get("/admin", adminController.list);
app.get("/admin/login/:admin_name", adminController.getAdminByUsername);
app.post("/admin/create", adminController.createAdmin);
app.delete("/admin/:id", adminController.delete);

app.listen(port, () => {
	console.log("App is now running at port ", port);
});
