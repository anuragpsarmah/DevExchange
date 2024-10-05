import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: [true, "Auth0 id is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
