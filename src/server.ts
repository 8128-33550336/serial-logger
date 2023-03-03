import express from "express";
import fs from "fs";
import { logfile } from "./envs";

export const app = express();

app.get('/', (req, res) => {
    const stream = fs.createReadStream('../resource/index.html');
    res.status(200).contentType('text/html');
    stream.pipe(res);
})

app.get('/all.csv', (req, res) => {
    const stream = fs.createReadStream(logfile);
    res.status(200).contentType('text/csv');
    stream.pipe(res);
});
