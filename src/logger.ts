import fs from "fs";
import { Transform } from "stream";
import { ReadlineParser, SerialPort } from "serialport";
import { logfile, sensorPath } from "./envs";

export default () => {
    const addTimeTransform = new Transform({
        transform(chunk, encoding, callback) {
            const date = new Date();
            const dateString = date.toLocaleString();
            this.push(dateString + chunk);
            callback();
        }
    });
    const fileWritestream = fs.createWriteStream(logfile, { flags: 'a' });

    const serialport = new SerialPort({
        'path': sensorPath,
        'baudRate': 115200
    });

    const parser = new ReadlineParser();

    serialport.pipe(parser);
    parser.pipe(addTimeTransform);
    addTimeTransform.pipe(process.stdout);
    addTimeTransform.pipe(fileWritestream);
}
