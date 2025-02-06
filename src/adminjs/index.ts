import AdminJs from 'adminjs'
import AdminJsExpress from '@adminjs/express'
import AdminJsSequelize from '@adminjs/sequelize'
import { database } from '../database'
import { adminJsResources } from './resources'
import { Category, Course, Episode, User } from '../models'
import bcrypt from 'bcrypt'
import { locale } from './locale'
import { brandingOptions } from './branding'
import { dashboardOptions } from './dashboard'
import { authtenticationOptions } from './authenctication'


AdminJs.registerAdapter(AdminJsSequelize)

export const adminJs = new AdminJs({
  databases: [database],
  resources:adminJsResources,
  rootPath: '/admin',
  locale:locale,
  dashboard:dashboardOptions,
  branding: 
   brandingOptions
    
  }
)

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(

  adminJs,
  authtenticationOptions,
  null,
  {
resave:false,
saveUninitialized:false
}
)