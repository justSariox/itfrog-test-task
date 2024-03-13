import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import bodyParser from 'body-parser'

import { router as cityRouter} from "./controllers/city.controller";
import { router as listRouter} from "./controllers/list.controller";

dotenv.config()

const MONGO_URL = process.env.MONGO_URL  || ''
const PORT = process.env.PORT || 3000

const app = express();


const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        app.use(bodyParser.json());
        app.use("/city", cityRouter);
        app.use("/list", listRouter)

        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/console.html');
        });

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT);
        })


    } catch (e) {
        console.log(e)
    }
}

start()

export default app