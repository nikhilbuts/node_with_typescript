import { validationResponse } from "../middlewares/request-validator";
import {
  bodyValidation,
  paramValidation,
  queryValidation,
} from "./validations";

export const userDetailValidator = [paramValidation.id, validationResponse];