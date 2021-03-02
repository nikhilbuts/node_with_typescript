import { body, query, param } from "express-validator/check";
import { EMAIL_REGEX } from "../../../common-modules/config/regex";
import { ResponseMessages } from "../../../common-modules/constants/response-messages";
import {
  DeviceType,
  AccountType,
} from "../../../common-modules/enums";
import { ApiConfig } from "../../../common-modules/config";

export const bodyValidation = {
 
  userName: body("userName", ResponseMessages.UserNameRequired)
    .isString()
    .not()
    .isEmpty(),

  email: body("email", ResponseMessages.EmailRequired)
    .isString()
    .matches(EMAIL_REGEX, "i"),

 
  password: body("password", ResponseMessages.PasswordRequired)
    .isString()
    .not()
    .isEmpty(),

 
  accessToken: body("accessToken", ResponseMessages.AccessTokenMissing)
    .isString()
    .not()
    .isEmpty(),

  name: body("name", ResponseMessages.NameRequired).isString().not().isEmpty(),

 
  isActive: body("isActive", ResponseMessages.IsActiveRequired)
    .isBoolean()
    .not()
    .isEmpty(),

  id: body("id", ResponseMessages.IdRequired).isString().not().isEmpty(),

  userId: body("userId", ResponseMessages.IdRequired)
    .isString()
    .not()
    .isEmpty(),

 };

export const queryValidation = {
  parentId_optional: query("parentId", "Must be string.").optional().isString(),
  search_optional: query("search", "Must be string.").optional().isString(),

  categoryId_optional: query("categoryId", "Must be string.")
    .optional()
    .isString(),

  pageNumber: query(
    "pageNumber",
    "Must be number, Can not be empty."
  ).isNumeric(),

  limit: query("limit", "Must be number, Can not be empty.").isNumeric(),
};

export const paramValidation = {

  id: param("id", ResponseMessages.IdRequired).isString().not().isEmpty(),

  userId: param("userId", ResponseMessages.UserIdRequired)
    .isString()
    .not()
    .isEmpty(),
};
