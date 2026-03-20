import * as z from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;


const UserLoginSchema = z
  .object({
    email : z.string().regex(emailRegex, "Invalid Email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .regex(
        passwordRegex,
        "Password must include 1 uppercase letter, 1 number, and 1 special character"
      ),
    registrationTime: z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date-time format",
  })
  .refine((val) => {
    const diff = (Date.now() - new Date(val).getTime()) / 1000;
    return diff <= 5;
  }, {
    message: "Login time must be within the last 5 seconds",
  }),
  });

  export default UserLoginSchema;

