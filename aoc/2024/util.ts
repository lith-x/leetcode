import { readFileSync } from "node:fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getInputText = (day: number) => {
    return readFileSync(`${__dirname}/day${day}.in`, { encoding: "utf8" });
}

export const getInputLines = (day: number) => {
    return getInputText(day).split("\n");
}
