import { getInputLines } from "./util";

const part1 = () => {
    const arrs: [number[], number[]] = [[], []];
    getInputLines(1).forEach(x => x.split("   ").forEach((val, i) => arrs[i].push(parseInt(val))));
    arrs.forEach(arr => arr.sort());
    let sum = 0;
    for (let i = 0; i < arrs[0].length; i++) {
        sum += Math.abs(arrs[0][i] - arrs[1][i]);
    }
    console.log(sum);
};

const part2 = () => {
    const start = Bun.nanoseconds();
    const simMap: Map<number, number> = new Map();
    const arrs: [number[], number[]] = [[], []];
    getInputLines(1).forEach(x => x.split("   ").forEach((val, i) => arrs[i].push(parseInt(val))));
    let sum = 0;
    arrs[0].forEach(val => {
        if (simMap.has(val))
            sum += simMap.get(val) as number;
        else {
            simMap.set(val, val * arrs[1].filter(x => x == val).length);
            sum += simMap.get(val) as number;
        }
    });
    console.log(sum);
    console.log((Bun.nanoseconds() - start) / 1e9);
};

part2();