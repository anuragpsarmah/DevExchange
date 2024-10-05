import { User } from "../../models/user.model.js";
import response from "../../utils/response.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiErrorClass.js";

const createUser = asyncHandler(async (req, res) => {
  const { auth0Id, username, email } = req.body;

  if (!auth0Id || !username || !email)
    return response(res, 404, "One or more fields are missing");

  try {
    const user = await User.findOne({ auth0Id });

    if (user) return response(res, 200, "Revisiting user");

    const newUser = await User.create({
      auth0Id,
      username,
      email,
    });

    return response(res, 200, "User registered successfully", {
      auth0Id: newUser.auth0Id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { createUser };
