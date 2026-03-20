import { Request, Response} from "express";
import type { UserRegistration } from "../types";
import { registerUser } from "../services/Signup.Service";

export const signup = async(req : Request, res : Response) => {

    const UserRegistrationdata : UserRegistration = req.body;

    try{
        const response = await registerUser(UserRegistrationdata);
        
        if(response.success){
            return res.status(201).json(response);
        }

        if(response.type === "INPUT_VALIDATION_ERROR"){
            return res.status(400).json(response);
        }

        if(response.type === "EXISTING_USER"){
            return res.status(409).json(response);
        }

        if(response.type === "INTERNAL_ERROR"){
            return res.status(500).json(response);
        }

        res.status(500).json({
            success : false,
            message : "UNHANDLED_ERROR"
        })
        
        
    }catch(error){
        console.error("ERROR_IN_SIGNUP_CONTROLLER", error);

        return res.status(500).json({
            success : false,
            message : "INTERNAL_SERVER_ERROR"
        });
        
    };
    
    
}
