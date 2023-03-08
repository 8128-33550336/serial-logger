import fs from "fs";
import { Transform } from "stream";
import { ReadlineParser, SerialPort } from "serialport";
import { logfile, sensorPath } from "./envs";
import { TypedEventEmitter } from "./typedEventEmitter";

fs.existsSync(logfile) || fs.writeFileSync(logfile, 'Time,Temperature,Humidity,CO2\n');

export const eventEmitter = new TypedEventEmitter<{
    data: [temp: number, hum: number, co2: number];
}>();

export default () => {
    const addTimeTransform = new Transform({
        transform(chunk, encoding, callback) {
            const date = new Date();
            const dateString = date.toLocaleString();
            this.push(dateString + ',' + chunk);
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

    parser.on('data', (chunk) => {
        const line = ('' + chunk).trim();
        const [temp, hum, co2] = line.split(',').map(v => +v);
        if (!(temp && hum && co2)) {
            return;
        }
        eventEmitter.emit('data', temp, hum, co2);
    });
};
