let express = require("express");
const { change_pass } = require("../../controllers/admin/changepass");
let router = express.Router();
let auth = require("../../../auth/adminauth");

router.patch("/adminChange_Pass", change_pass);

module.exports = router;
