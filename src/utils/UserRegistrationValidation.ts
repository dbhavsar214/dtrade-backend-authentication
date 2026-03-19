import * as z from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;


const userRegistrationSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email : z.string().regex(emailRegex, "Invalid Email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .regex(
        passwordRegex,
        "Password must include 1 uppercase letter, 1 number, and 1 special character"
      ),
    confirmPassword: z
      .string()
      .min(8)
      .max(16)
      .regex(
        passwordRegex,
        "Confirm Password must include 1 uppercase letter, 1 number, and 1 special character"
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
    message: "Registration time must be within the last 5 seconds",
  }),
  }) 
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export default userRegistrationSchema;

