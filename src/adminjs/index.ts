import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { database } from "../database";

import session from "express-session"
import connectSession from 'connect-session-sequelize'


import { brandingOptions } from "./branding";
import { dashboardOptions } from "./dashboard";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";
import { authtenticationOptions } from "./authenctication";



const SequelizeStore= connectSession(session.Store)
const store=new SequelizeStore({db:database})
store.sync()
AdminJS.registerAdapter(AdminJSSequelize)
export const adminjs= new AdminJS({
    databases:[database],
    rootPath:'/admin',
    resources:adminJsResources,
    branding:brandingOptions
    ,
            locale:locale,
    dashboard:dashboardOptions

})
export  const adminjsRouter= AdminJSExpress.buildAuthenticatedRouter(adminjs,authtenticationOptions,
null,{
  resave:false
, 
saveUninitialized:false,
store:store,
secret:ADMINJS_COOKIE_PASSWORD
})