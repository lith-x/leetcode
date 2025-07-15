import { readFileSync } from "fs";

const part1 = () => {
    const input = readFileSync(`${__dirname}/day1.in`, { encoding: "utf8" });
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        switch(input[i]) {
            case '(':
                floor += 1;
                break;
            case ')':
                floor -= 1;
                break;
            default:
                throw new Error(`unexpected char ${input[i]}`);
        }
    }
    console.log(floor);
};

const part2 = () => {
    const input = readFileSync(`${__dirname}/day1.in`, { encoding: "utf8" });
    let floor = 0;
    let i = 0;
    for (; i < input.length; i++) {
        switch(input[i]) {
            case '(':
                floor += 1;
                break;
            case ')':
                floor -= 1;
                break;
            default:
                throw new Error(`unexpected char ${input[i]}`);
        }
        if (floor < 0) break;
    }
    console.log(i + 1);
};

part2();