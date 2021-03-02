import mongoose from "mongoose";

// This schema will store the auto increment ids
const CounterSchema = new mongoose.Schema({
  _id: String,
  sequence: { type: Number, default: 111111 }
});

export default mongoose.model("Counter", CounterSchema);
