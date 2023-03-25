import { TypedEventEmitter } from "./typedEventEmitter.js";

export const eventEmitter = new TypedEventEmitter<{
    data: [temp: number, hum: number, co2: number];
}>();
