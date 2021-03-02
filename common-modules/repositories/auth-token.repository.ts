import { Document } from "mongoose";
import authTokenSchema from "../database/schemas/auth-token.schema";
import { AuthToken } from "../models";

export class AuthTokenRepository {
  static storeUserAuthToken = async (
    authToken: AuthToken
  ): Promise<AuthToken> => {
    const dbResponse = await authTokenSchema.findOneAndUpdate(
      {
        userId: authToken.userId,
      },
      authToken,
      {
        new: true,
        upsert: true,
      }
    );
    return dbResponse.toJSON();
  };


  static getTokenOfUser = async (
    userId: string
  ): Promise<(AuthToken & Document) | null> => {
    const dbResponse = await authTokenSchema.findOne({ userId: userId });
    return dbResponse;
  };

  static getAuthTokenByToken = async (
    token: string
  ): Promise<AuthToken | null> => {
    const dbResponse = await authTokenSchema.findOne({ accessToken: token });
    return dbResponse;
  };
}
