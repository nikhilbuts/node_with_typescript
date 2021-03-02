import mongoose, { Document } from "mongoose";
import { ApiConfig } from "../../config";
import { AccountType, CounterType, DeviceType } from "../../enums";
import { User } from "../../models";
import counterSchema from "./counter.schema";

const UserSchema = new mongoose.Schema<User>(
  {
    name: { type: String },
    userId: { type: Number, unique: true },
    email: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, required: true, default: Date.now() },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret.__v;
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

// This middleware is responsible for generating user Id
UserSchema.pre("save", async function (next) {
  const document = this;

  if (document.isNew) {
    const counterObj = await counterSchema.findById(CounterType.UserId);
    let currentCounter = counterObj
      ? counterObj.toJSON().sequence
      : ApiConfig.DEFAULT_COUNTER;

    console.log("userId", currentCounter);
    document.set({ userId: currentCounter });

    await counterSchema.findByIdAndUpdate(
      CounterType.UserId,
      {
        sequence: ++currentCounter,
      },
      { new: true, upsert: true }
    );
  }
  next();
});
export default mongoose.model<User & Document>("User", UserSchema);
