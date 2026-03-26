import { ZodError } from "zod";
import bcrypt from "bcrypt";

import type { UserLogin, AuthenticatedUser } from "../types";
import UserLoginSchema from "../utils/UserLoginValidation";
import { findbyUserEmail } from "../repository/Login.repository";
import { generateToken } from "../utils/jwt";

export const loginUser = async(data : UserLogin) => {
    try{
        const userLoginFormData = UserLoginSchema.parse(data);

        const existingUser : AuthenticatedUser | null = await findbyUserEmail(userLoginFormData.email);

        if(!existingUser){
            throw new Error("INVALID_CREDENTIALS");
        }
        
        const isMatch = await bcrypt.compare(userLoginFormData.password, existingUser.password);

        if(!isMatch){
            throw new Error("INVALID_CREDENTIALS")
        }

        const token = generateToken(existingUser);

        return{
            success : true,
            token ,
            message : "USER_AUTHENTICATED_SUCCESSFULLY"
        }

    }catch(error){

        if(error instanceof ZodError){
            return {
                success : false,
                type : "INPUT_VALIDATION_ERROR",
                message : "INVALID_USER_INPUTS"
            }
        }

        if(error instanceof Error && error.message === "INVALID_CREDENTIALS"){
            return {
                success : false,
                type : "AUTH_ERROR",
                message : "INVALID_CREDENTIALS"
            }
        }
        
        console.error("LOGIN_SERVICE_ERROR",error)

        return {
            success : false,
            type : "INTERNAL_SERVER_ERROR",
            message : "Something Went Wrong"
        }
    }
}