import fs from "fs";
import { ReadlineParser, SerialPort } from "serialport";
import { logfile, sensorPath } from "./envs";

export default () => {
    const writestream = fs.createWriteStream(logfile, { flags: 'a' });

    const serialport = new SerialPort({
        'path': sensorPath,
        'baudRate': 115200
    });

    const parser = new ReadlineParser();
    parser.on('data', (chunk) => {
        const date = new Date();
        
    });

    serialport.pipe(parser);
    parser.pipe(process.stdout);
    parser.pipe(writestream);
}