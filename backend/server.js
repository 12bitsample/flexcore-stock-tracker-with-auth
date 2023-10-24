import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import coresRoutes from './routes/cores.js';
import userRoutes from './routes/user.js';

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();

})

//routes
app.use('/api/cores', coresRoutes);
app.use('/api/user', userRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to Database!! Listening on Port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    });
    

