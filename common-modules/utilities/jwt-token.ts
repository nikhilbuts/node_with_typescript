import * as jwt from "jsonwebtoken";
import { ApiConfig } from "../config";
import { getErrorResponse } from "./api-response";
import httpStatus from "http-status";
import { ResponseMessages } from "../constants/response-messages";

export async function generateToken(data: any) {
  return await jwt.sign(
    JSON.parse(JSON.stringify(data)),
    ApiConfig.JWT_SECRET,
    {
      expiresIn: ApiConfig.JWT_EXPIRES_IN,
    }
  );
}

export async function verifyToken(token: string) {
  if (token) {
    try {
      const jwtResponse = await jwt.verify(token, ApiConfig.JWT_SECRET);
      return !!jwtResponse;
    } catch (e) {
      console.log("e:", e);
      return false;
    }
  } else {
    return false;
  }
}

export async function getDataFromToken(token: string) {
  if (token) {
    try {
      const jwtResponse = await jwt.verify(token, ApiConfig.JWT_SECRET);
      return JSON.parse(JSON.stringify(jwtResponse));
    } catch (e) {
      console.log("e:", e);
      return null;
    }
  } else {
    return null;
  }
}

export function generateRefreshToken(data: any) {
  return jwt.sign(JSON.parse(JSON.stringify(data)), ApiConfig.JWT_SECRET);
}

export const validateToken = (req: any, res: any, next: any) => {
  try {
    req["user"] = jwt.verify(
      req.headers.authorization.split(" ")[1],
      ApiConfig.JWT_SECRET
    );

    console.log("User", req["user"]);
    next();
  } catch (err) {
    const response = getErrorResponse(
      httpStatus.UNAUTHORIZED,
      ResponseMessages.TokenInvalid
    );
    res.status(response.status).send(response);
  }
};
