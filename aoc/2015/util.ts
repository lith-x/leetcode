import { readFileSync } from "fs";

export const getInputText = (day: number) => {
    return readFileSync(`${__dirname}/day${day}.in`, { encoding: "utf8" });
}

export const getInputLines = (day: number) => {
    return getInputText(day).split("\n");
}