import { Request, Response } from "express";

import { loginUser } from "../services/Login.Service";
import type { UserLogin } from "../types";

export const login = async(req : Request, res : Response) =>{

    const userLoginData : UserLogin = req.body;

    try{
        const response = await loginUser(userLoginData);

        if(response.success){

            res.cookie("token", response.token , {
                httpOnly : true,
                secure : false,
                sameSite : "lax" ,
            });
            return res.status(200).json(response);
        }

        if(response.type === "INPUT_VALIDATION_ERROR"){
            return res.status(400).json(response);
        }
        if(response.type === "AUTH_ERROR"){
            return res.status(401).json(response);
        }

        if(response.type === "INTERNAL_SERVER_ERROR"){
            return res.status(500).json(response);
        }

        return res.status(500).json({
            success : false,
            message : "UNHANDLED_ERROR"
        });


    }catch(error){
        console.error("ERROR_IN_LOGIN_CONTROLLER", error);

        return res.status(500).json({
            success : false,
            message : "INTERNAL_SERVER_ERROR"
        })
    }

};