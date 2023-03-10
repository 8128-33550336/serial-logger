import fs from "node:fs";
import express from "express";
import expressWs from "express-ws";
import { logfile } from "./envs";
import { listenerType } from "./typedEventEmitter";
import { eventEmitter } from "./eventEmitter";


export const app = expressWs(express()).app;

app.get('/all.csv', (req, res) => {
    const stream = fs.createReadStream(logfile);
    res.status(200).contentType('text/csv');
    stream.pipe(res);
});

app.get('/all.txt', (req, res) => {
    const stream = fs.createReadStream(logfile);
    res.status(200).contentType('text/plain');
    stream.pipe(res);
});

app.ws('/', (ws, req) => {
    const listener: listenerType<typeof eventEmitter, 'data'> = (temp, hum, co2) => {
        ws.send(JSON.stringify({ temp, hum, co2 }));
    };

    eventEmitter.on('data', listener);

    let pongTimeout: NodeJS.Timeout | null = null;
    const interval = setInterval(() => {
        ws.send('ping');
        pongTimeout = setTimeout(() => {
            ws.close();
        }, 3 * 1000);
    }, 300 * 1000);

    ws.on('close', () => {
        if (pongTimeout !== null) {
            clearTimeout(pongTimeout);
        }
        clearInterval(interval);
        eventEmitter.off('data', listener);
    });

    ws.on('message', (data) => {
        const message = '' + data;
        if (message === 'pong' && pongTimeout !== null) {
            clearTimeout(pongTimeout);
        }
    });
});

{
    let val: { temp: number, hum: number, co2: number; } = { temp: 0, hum: 0, co2: 0 };
    eventEmitter.on('data', (temp, hum, co2) => {
        val = { temp, hum, co2 };
    });
    app.get('/info', (req, res) => {
        res.json(val);
    });
}


app.use(express.static('./resource'));
