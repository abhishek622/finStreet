const express = require("express");
const adminController = require("../controllers").adminController;

const router = express.Router();

const { listAdmins, loginAdmin, register, deleteAdmin } = adminController;

router.use(listAdmins);
router.use(loginAdmin);
router.use(register);
router.use(deleteAdmin);

module.exports = router;
