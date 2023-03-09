import { TypedEventEmitter } from "./typedEventEmitter";

export const eventEmitter = new TypedEventEmitter<{
    data: [temp: number, hum: number, co2: number];
}>();
