import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { Favorite } from './Favorite'
import { Like } from './Likes'
import { User } from './User'
import { WatchTime } from './WachTime'

Category.hasMany(Course,  {as:'courses',foreignKey:'categoryId'}) 

Course.belongsTo(Category,{foreignKey:"categoryId"})
Course.hasMany(Episode,{ as :'episodes'})
Course.belongsToMany(User, { through: Favorite })
Course.belongsToMany(User , {through:Like})
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' })

Episode.belongsTo(Course)

Episode.belongsToMany(User, {through:WatchTime})

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, { through: Favorite })
User.belongsToMany(Course,{through:Like})
User.belongsToMany(Episode, {through:WatchTime})
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'user_id' })

export {
  Category,
  Course,
  Episode,
	Favorite,
  User,
  Like,
  WatchTime
}