import express from "express";
import {skillsRouter} from "./modules/skills/router";
import cors from "cors";
import {logRequest} from "./middlware/logger";

const app = express()

app.use(cors())
app.use(express.json())
app.use(logRequest)
app.use('/skills', skillsRouter)

app.listen(8080, () => {

    console.log('Server is running on port 8080');

});
