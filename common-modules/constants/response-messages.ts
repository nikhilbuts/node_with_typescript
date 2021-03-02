// Response messages
export enum ResponseMessages {

  TokenExpired = "Your Token has been Expired. Please Generate New Token.",
  TokenInvalid = "Access token is invalid.",

  ServerError = "Server error occurred, Please try again.",
  ApiRouteIsNotFound = "Api route is not found.",

  LoginSuccess = "Login Successful",
  Success = "Success",

  UserNameRequired = "Username is required.",
  EmailRequired = "Email is required.",
  UserNameExist = "User name already exist.",
  EmailExist = "Email already exist.",
  ProfileSuccess = "User Profile Completed Successfully",
  UpdateProfileSuccess = "Profile Updated Successfully",
  EmailValidationError = "Please enter a valid Email Address",

  PasswordRequired = "Password is required.",

  InvalidCredentials = "Please check your credentials and try again",
  InvalidOldPassword = "Invalid old password",

  AccessTokenMissing = "Access token is missing.",
  WrongTokenData = "Please provide valid access token and refresh token",

  RecordsNotFound = "Records not found",
  NameRequired = "Name is required",
  IsActiveRequired = "isActive is required",
  IdRequired = "Valid Id is required",
  UserIdRequired = "Valid User Id is required",
  UserProfileIsNotFound = "User profile is not found.",

  ParameterMissing = "Parameter(s) missing.",
  UnauthorizedRequest = "You are not authenticated."


}
