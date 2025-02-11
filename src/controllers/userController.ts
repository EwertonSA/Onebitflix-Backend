import { Response } from "express";
import { AuthenticatedRequest } from "../middlwares/auth";
import { userService } from "../services/userService";

export const userController={
    watching:async(req:AuthenticatedRequest,res:Response)=>{
        const {id}= req.user!
        try {
            const watching= await userService.getWatchingList(id)
            return res.json(watching)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({message:error.message})
            }
        }
    }
}