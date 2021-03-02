import { User } from "../models/user.model";
import userSchema from "../database/schemas/user.schema";

export class UserRepository {
  static addUser = async (user: User): Promise<User | null> => {
    const dbResponse = await userSchema.create(user);

    return dbResponse ? dbResponse.toJSON() : null;
  };

  static updateUser = async (user: User): Promise<User | null> => {
    const dbResponse = await userSchema.findByIdAndUpdate(user.id, user, {
      new: true,
    });
    return dbResponse ? dbResponse.toJSON() : null;
  };

  static getUserByEmail = async (email: string): Promise<User | null> => {
    const dbResponse = await userSchema.findOne({
      email: email,
    });
    return dbResponse ? dbResponse.toJSON() : null;
  };

  static getUserById = async (userId: string): Promise<User | null> => {
    const dbResponse = await userSchema.findById(userId);
    return dbResponse ? dbResponse.toJSON() : null;
  };

}
