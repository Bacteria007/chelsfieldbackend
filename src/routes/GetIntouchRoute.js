const express = require("express");
const { GetInTouchController } = require("../controllers/GetInTouchController");


const GetInTouchRouter = express.Router();

GetInTouchRouter.post('/touch', GetInTouchController);
module.exports = GetInTouchRouter;