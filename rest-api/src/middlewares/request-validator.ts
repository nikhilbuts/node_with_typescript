import { validationResult } from "express-validator/check";
import httpStatus from "http-status";
import { getErrorResponse } from "../../../common-modules/utilities/api-response";

// API parameters validator middleware method
export function validationResponse(req: any, res: any, next?: any) {
  const errors = validationResult(req);
  console.log("[req.body]", req.body);

  if (!errors.isEmpty()) {
    let errorMessages: any[] = errors.array();

    const response = getErrorResponse(
      httpStatus.BAD_REQUEST,
      errorMessages[0].msg
    );
    res.status(response.status).send(response);
    return;
  }
  next();
}
