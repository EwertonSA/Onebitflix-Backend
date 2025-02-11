import { User } from "../models"
import { EpisodeInstance } from "../models/Episode"
import { UserCreationAttributes } from "../models/User"

const filterLastEpisodes=(episodes:EpisodeInstance[])=>{
const coursesList:number[]=[]
const lastEpisodes= episodes.reduce((currentList,episode)=>{
if(!coursesList.includes(episode.courseId)){
  coursesList.push(episode.courseId)
  currentList.push(episode)
  return currentList
}
const episodeSameCourse= currentList.find(ep => ep.courseId === episode.courseId)
if(episodeSameCourse!.order>episode.order) return currentList
const noEpisodeSameCourse= currentList.filter(ep=>ep.courseId !== episode.courseId)
noEpisodeSameCourse.push(episode)
return noEpisodeSameCourse
},[] as EpisodeInstance[])
return lastEpisodes
}

export const userService = {
    findByEmail: async (email: string) => {
      const user = await User.findOne({
        attributes: [
          'id',
          ['first_name', 'firstName'],
          ['last_name', 'lastName'],
          'phone',
          'birth',
          'email',
          'password'
        ],
        where: { email }
      })
      return user
    },
    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
      },
      getWatchingList:async(id:number)=>{
        const UserWatchingEpisodes= await User.findByPk(id,{
          include: {
            association: 'Episodes',
            attributes: [
              'id',
              'name',
              'synopsis',
              'order',
              ['video_url', 'videoUrl'],
              ['seconds_long', 'secondsLong'],
              ['course_id', 'courseId']
            ],
            include: [{
              association: 'Course',
              attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
              ],
              as: 'course'
            }],
            through: {
              as: 'watchTime',
              attributes: [
                'seconds',
                ['updated_at', 'updatedAt']
              ]
            }
          }
        })
        if(!UserWatchingEpisodes) throw new Error ("Usuário não encontrado.")
        const keepWatchingList= filterLastEpisodes(UserWatchingEpisodes.Episodes!)
         
          keepWatchingList.sort((a, b) => 
             // @ts-ignore
            new Date(a.watchTime.updatedAt).getTime() < new Date(b.watchTime.updatedAt).getTime() ? 1 : -1
          );

      return keepWatchingList

      }
  }