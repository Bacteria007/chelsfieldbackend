import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types";
export const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log the error

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
export const TryCatch = (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
};
