import dotenv from 'dotenv';
dotenv.config()

import express from 'express'
import cors from 'cors'
import { database } from './database'
import { adminjs, adminjsRouter } from './adminjs'
import { router } from './routes'
const app= express()
app.use(cors())
app.use(adminjs.options.rootPath,adminjsRouter)
app.use(express.json())
app.use(express.static('public'))
app.use(router)

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    database.authenticate()
        .then(() => console.log('DB connection successful'))
        .catch(err => console.error('Database connection error:', err));

    console.log(`Server started successfully at port ${PORT}`);
});