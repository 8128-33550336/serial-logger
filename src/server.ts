import fs from "node:fs";
import express from "express";
import { logfile } from "./envs";

export const app = express();

app.get('/all.csv', (req, res) => {
    const stream = fs.createReadStream(logfile);
    res.status(200).contentType('text/csv');
    stream.pipe(res);
});

app.use(express.static('./resource'));
