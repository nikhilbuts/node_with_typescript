import httpStatus from "http-status";
import fs from "fs";
import {
  getErrorResponse,
  getResponse,
} from "../../../common-modules/utilities/api-response";
import { ResponseMessages } from "../../../common-modules/constants/response-messages";

import {
  User,
  ApiResponse
} from "../../../common-modules/models";
import {
  UserRepository,
  AuthTokenRepository,
} from "../../../common-modules/repositories";
import {
  generateToken,
  generateRefreshToken,
} from "../../../common-modules/utilities/jwt-token";

export default class UserController {
  /**
   * User Routes
   */
  // common method for login response for admin user
  private static getUserLoginResponse = async (
    user: User
  ): Promise<User | null> => {
    delete user.token;
    console.log("[user token]", user);

    const generatedToken = await generateToken(user);
    console.log("[generated token]", generatedToken);

    const refreshToken = await generateRefreshToken({
      id: user.id,
      email: user.email
    });

    const token = {
      userId: user.id,
      accessToken: generatedToken
    };

    console.log("[token object]", token);

    const addedToken = await AuthTokenRepository.storeUserAuthToken(token);
    if (addedToken) {
      user.token = addedToken;

      console.log("[getUserLoginResponse]", user, addedToken);
      return user;
    } else {
      return null;
    }
  };


  static signUp = async (
    user: User
  ): Promise<ApiResponse> => {
    try {
      console.info("User Info : ", { user });

      const existingUser = await UserRepository.getUserByEmail(
        user.email ? user.email : ""
      );

      if(existingUser){
        return getErrorResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          ResponseMessages.EmailExist
        )
      }
      return getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessages.ServerError
      );
 
    } catch (error) {
      console.error(error);

      return getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessages.ServerError
      );
    }
  };

  // Login 
  static login = async (
    email: string,
  ): Promise<ApiResponse> => {
    try {

      let existingUser = await UserRepository.getUserByEmail(
        email
      );

      if (!existingUser) {
        return getErrorResponse(
          httpStatus.FORBIDDEN,
          "Email Not Found"
        );
      }



      let finalUser = await UserController.getUserLoginResponse(existingUser);


      if (finalUser && finalUser.id) {
        return getResponse(
          httpStatus.OK,
          ResponseMessages.LoginSuccess,
          finalUser
        );
      } else {
        return getErrorResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          ResponseMessages.ServerError
        );
      }
    } catch (error) {
      console.error(error);

      return getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessages.ServerError
      );
    }
  };

  // Update User 
  static updateUser = async (
    user: User,
    name: string,
  ): Promise<ApiResponse> => {
    try {
      console.log("Update User profile", { name });
      user.name = name;

      const updatedUser = await UserRepository.updateUser(user);

      if (updatedUser && updatedUser.id) {
        return getResponse(
          httpStatus.OK,
          ResponseMessages.UpdateProfileSuccess,
          updatedUser
        );
      } else {
        return getErrorResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          ResponseMessages.ServerError
        );
      }
    } catch (error) {
      console.error(error);

      return getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessages.ServerError
      );
    }
  };


  // View User 
  static getUserDetail = async (userId: string): Promise<ApiResponse> => {
    try {
      const existingUser = await UserRepository.getUserById(userId);

      if (existingUser && existingUser.id) {
        return getResponse(
          httpStatus.OK,
          ResponseMessages.Success,
          existingUser
        );
      } else {
        return getErrorResponse(
          httpStatus.INTERNAL_SERVER_ERROR,
          ResponseMessages.ServerError
        );
      }
    } catch (error) {
      console.error(error);

      return getErrorResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        ResponseMessages.ServerError
      );
    }
  };
}
