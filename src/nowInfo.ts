let val: { temp: number, hum: number, co2: number; } = { temp: 0, hum: 0, co2: 0 };
eventEmitter.on('data', (temp, hum, co2) => {
    val = { temp, hum, co2 };
});

export function nowInfo() {
    return val;
}