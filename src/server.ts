import fs from "node:fs";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from "express";
import { logfile } from "./envs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.get('/all.csv', (req, res) => {
    const stream = fs.createReadStream(logfile);
    res.status(200).contentType('text/csv');
    stream.pipe(res);
});

app.use(express.static(path.join(__dirname, '..', 'resource')));
