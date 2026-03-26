import { Request, Response } from "express";

export const logoutUser = (req : Request, res : Response) => {
    res.cookie("token", "", {
        httpOnly : true,
        expires : new Date(0),
        sameSite : "lax",
    });
    
    return res.status(200).json({success : true, message : "Logged Out"});
}