import { readFileSync } from "fs";

const original = readFileSync("./day8.in", {encoding: "utf8" }).split("\n")[11];
console.log(original);

console.log(original.match(/\\\\/g));
console.log(original.match(/\\\"/g));
console.log(original.match(/\\x\d\d/g));