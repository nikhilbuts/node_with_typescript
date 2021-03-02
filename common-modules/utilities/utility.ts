import { EMAIL_REGEX } from "../config/regex";
import { ApiConfig } from "../config";

interface OTP {
  status: boolean;
  otp: string;
  message: string;
}


// Validate Email
export async function validateEmail(email: string) {
  const re = EMAIL_REGEX;
  return re.test(email);
}

export function getFileFullPath(file: string) {
  return ApiConfig.S3_BASE_PATH + file;
}
