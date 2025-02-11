import { Request, Response } from 'express'

import { episodeService } from '../services/episodeService'
import { AuthenticatedRequest } from '../middlwares/auth'

export const episodesController = {
    stream:async(req:Request,res:Response)=>{
        const{videoUrl}=req.query
        try{
if(typeof videoUrl !== 'string') throw new Error('videoUrl must be of type string')
    const range= req.headers.range
episodeService.streamEpisodeToResponse(res, videoUrl ,range)
    }catch(error){
    if(error instanceof Error){
        return res.status(400).json({message:error.message})
    }
}
},
getWatch:async(req:AuthenticatedRequest,res:Response)=>{
    const userId=req.user!.id
    const episodeid=req.params.id
    try {
        const watch=await episodeService.getWatch(userId, Number(episodeid))
        return res.json(watch)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({message:error.message})
        }
    }

},
setWatch:async(req:AuthenticatedRequest,res:Response)=>{
    const userId=req.user!.id
    const episodeId=Number(req.params.id)
    const {seconds}=req.body
    try {
        const watch=await episodeService.setWatch({
            userId,
            episodeId,
            seconds
        })
        return res.json(watch)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({message:error.message})
        }
    }

}


}