import * as readline from 'node:readline';
import { nowInfo } from "./nowInfo.js";

export function replStart() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '> ',
    });

    rl.prompt();

    rl.on('line', (line) => {
        const command = line.trim();
        if (command === 'info') {
            console.log(nowInfo());
        } else if (command.startsWith('frc:')) {
            const val = +command.slice(4);
            if (Number.isNaN(val)) {
                return;
            }
            
        } else {
            console.log(`unknown '${line.trim()}'`);
            break;
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
    });
}
