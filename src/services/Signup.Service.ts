import bcrypt from "bcrypt";
import zodError from "zod";

import { createUser, findbyUserEmail } from "../repository/Signup.Repository";
import { UserRegistration } from "../types";
import userRegistrationSchema from "../utils/UserRegistrationValidation";

export const registerUser = async (data: UserRegistration) => {
  try {
    const validUserData = userRegistrationSchema.parse(data);

    const existingUser = await findbyUserEmail(validUserData.email);
    if (existingUser) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await createUser({
      ...validUserData,
      password: hashedPassword,
    });

    return {
      success: true,
      data: "USER_REGISTERED_SUCCESSFULLY",
    };
  } catch (error) {
    if (error instanceof zodError.ZodError) {
      return {
        success: false,
        type: "INPUT_VALIDATION_ERROR",
        error: error.message,
      };
    }

    if (error instanceof Error && error.message === "USER_ALREADY_EXISTS") {
      return {
        success: false,
        type: "EXISTING_USER",
        message: "USER_ALREADY_EXISTS",
      };
    }

    if (error instanceof Error && error.message === "DB_ERROR") {
      return {
        success: false,
        type: "INTERNAL_ERROR",
        message: "ERROR_REGISTERING_USER_IN_DATABASE",
      };
    }

    console.error("ERROR_IN_SIGNUP_SERVICE :", error);

    return {
      success: false,
      type: "INTERNAL_SERVER_ERROR",
      message: "SOMETHING_WENT_WRONG",
    };
  }
};
