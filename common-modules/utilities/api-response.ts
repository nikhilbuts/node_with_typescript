import httpStatus from "http-status";
import { ApiResponse } from "../models";

// General success api response
export function getResponse(
  status = httpStatus.OK,
  message: any = null,
  data: any = null
): ApiResponse {
  const result: any = {
    status: status,
    message: message ? message.toString() : "Request Success.",
    data: data !== null ? data : {},
  };

  if (status >= httpStatus.BAD_REQUEST) {
    result.success = false;
  }
  return result;
}

// General error api response
export function getErrorResponse(
  status = httpStatus.INTERNAL_SERVER_ERROR,
  message: any = null
): ApiResponse {
  const result: any = {
    status: status,
    message: message ? message.toString() : "Internal server error.",
  };

  return result;
}
