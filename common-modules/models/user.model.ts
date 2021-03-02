import { AuthToken } from ".";

export class User {
  id?: string;
  name?: string;
  userId?: string;
  email?: string;
  mobileNumber?: string;
  isActive?: boolean;
  createdAt?: Date;
  token?: AuthToken;
}
