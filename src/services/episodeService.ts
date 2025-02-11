import fs, { exists } from "fs"
import path from "path"
import {Response} from 'express'
import { WatchTime, WatchTimeAttributes } from "../models/WachTime"

export const episodeService={
    streamEpisodeToResponse:(res:Response,videoUrl:string,range:string|undefined)=>{
        const filePath=path.join(__dirname,'../','../','uploads',videoUrl)
        const fileStat= fs.statSync(filePath)
       
        if(range){
            const parts=range.replace(/bytes=/,'').split('-')
            const start=parseInt(parts[0],10)
            const end=parts[1]?parseInt(parts[1],10):fileStat.size-1
            const chumksize=(end-start)+1
            const file=fs.createReadStream(filePath,{start,end})
            const head={
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Rangers': 'bytes',
                'Content-length': chumksize,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(206, head)
            file.pipe(res)
        }else{
            const head={
             
                'Content-length': fileStat.size,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(200,head)
            fs.createReadStream(filePath).pipe(res)
        }
              
        },
        getWatch:async(userId:number,episodeId:number)=>{
            const watchTime= await WatchTime.findOne({
                attributes:['seconds'],
                where:{
                    userId,episodeId
                }
            })
            
            return watchTime
        },
        setWatch:async({userId,episodeId,seconds}:WatchTimeAttributes)=>{
            const exists= await WatchTime.findOne({
                where:{userId,episodeId}
            })
            if(exists){
             exists.seconds=seconds
             await exists.save()
             return exists   
            }else{
                const watchTime=await WatchTime.create({
                    userId,episodeId,seconds
                   })

            
          
           return watchTime
        }
    }}