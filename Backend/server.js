import express from 'express';
import './database.js'
import apiRouter from './api/router.js'

const app = express();
const port = process.env.SERVER_PORT;


app.use(express.json());
app.use(apiRouter);
app.listen(port,() => {
    console.log(`Server up, listen on ${port}`);
})