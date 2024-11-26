const express = require("express");
const { HireHallController } = require("../controllers/HireHallController");

const HireHallRouter = express.Router();

HireHallRouter.post('/hireHall', HireHallController);

module.exports = HireHallRouter;