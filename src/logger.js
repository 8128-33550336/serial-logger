const { SerialPort, ReadlineParser } = require("serialport");
const fs = require('fs');

const writestream = fs.createWriteStream('./tmpLog.csv', { flags: 'a' });

const serialport = new SerialPort({
    'path': '/dev/',
    'baudRate': 115200
});

const parser = new ReadlineParser()

serialport.pipe(parser);
parser.pipe(process.stdout);
parser.pipe(writestream);
