import mongoose, { Document } from "mongoose";
import { AuthToken } from "../../models";

const AuthTokenSchema = new mongoose.Schema<AuthToken>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    accessToken: { type: String }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

export default mongoose.model<AuthToken & Document>(
  "AuthToken",
  AuthTokenSchema
);
