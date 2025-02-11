import { Response } from "express";
import { AuthenticatedRequest } from "../middlwares/auth";
import { userService } from "../services/userService";

export const userController={
    show:async(req:AuthenticatedRequest,res:Response)=>{
const currentUser= req.user!
try {
    return res.json(currentUser)
} catch (error) {
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
}
    },
    update:async(req:AuthenticatedRequest,res:Response)=>{
const id=req.user!.id
const {firstName,lastName,phone,birth,email}=req.body
try {
    const updatedUser= await userService.update(id,{
        firstName,lastName,phone,birth,email
    })
    return res.json(updatedUser)
} catch (error) {
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
}
    },
    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const { currentPassword, newPassword } = req.body
      
        if (!user) {
          return res.status(401).json({ message: 'Não autorizado!' })
        }
      
        try {
          user.checkPassword(currentPassword, async (err, isSame) => {
            if (err) {
              return res.status(400).json({ message: err.message })
            }
      
            if (!isSame) {
              return res.status(400).json({ message: 'Senha incorreta' })
            }
      
            await userService.updatePassword(user.id, newPassword)
            return res.status(204).send()
          })
        } catch (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
          }
        }
      },
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