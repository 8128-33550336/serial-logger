import fs from "fs";
import { Transform } from "stream";
import { ReadlineParser, SerialPort } from "serialport";
import { logfile, sensorPath } from "./envs.js";
import { eventEmitter } from "./eventEmitter.js";

fs.existsSync(logfile) || fs.writeFileSync(logfile, 'Time,Temperature,Humidity,CO2\n');
export default () => {
    const addTimeTransform = new Transform({
        transform(chunk, encoding, callback) {
            const date = new Date();
            const dateString = date.toLocaleString();
            this.push(dateString + ',' + chunk + '\n');
            callback();
        }
    });
    const fileWritestream = fs.createWriteStream(logfile, { flags: 'a' });

    const serialport = new SerialPort({
        'path': sensorPath,
        'baudRate': 115200
    });
    
    serialport.on('error', () => {
        process.exit(1);
    });

    serialport.on('close', () => {
        process.exit(1);
    });

    const parser = new ReadlineParser();

    serialport.pipe(parser);
    parser.pipe(addTimeTransform);
    addTimeTransform.pipe(fileWritestream);

    parser.on('data', (chunk) => {
        const line = ('' + chunk).trim();
        const [temp, hum, co2] = line.split(',').map(v => +v);
        if (!(temp && hum && co2)) {
            return;
        }
        eventEmitter.emit('data', temp, hum, co2);
    });
    return {
        frc(num: number) {
            serialport.write(num + '\n');
        }
    };
};
