const express = require("express");
const MembershipController=require('../controllers/UserController')

const Memberrouter = express.Router();

Memberrouter.post('/join', MembershipController.MembershipController);

module.exports = Memberrouter;