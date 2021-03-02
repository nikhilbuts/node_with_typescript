import httpStatus from "http-status";
import path from "path";
import { Response, Request } from "express";
import { getErrorResponse } from "../../../common-modules/utilities/api-response";
import { ResponseMessages } from "../../../common-modules/constants/response-messages";
import { ApiConfig } from "../../../common-modules/config";

export function routeNotFound(req: Request, res: Response, next: any) {
  const response = getErrorResponse(
    httpStatus.NOT_FOUND,
    ResponseMessages.ApiRouteIsNotFound
  );
  res.status(response.status).send(response);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: any
) {
  if (!err) {
    return next();
  }
  const response = getErrorResponse(
    httpStatus.INTERNAL_SERVER_ERROR,
    err.message
  );
  res.status(response.status).send(response);
}