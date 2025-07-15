import { getInputText } from "./util";

const part1 = () => {
    const stones = getInputText(11).split(" ");
    let prevBlink = [...stones];
    let nextBlink: string[] = [];
    for (let blink = 0; blink < 25; blink++) {
        for (let i = 0; i < prevBlink.length; i++) {
            if (prevBlink[i] === "0") nextBlink.push("1");
            else if (prevBlink[i].length % 2 == 0) {
                const val1 = parseInt(prevBlink[i].substring(0, prevBlink[i].length / 2)).toString();
                const val2 = parseInt(prevBlink[i].substring(prevBlink[i].length / 2, prevBlink[i].length)).toString();
                nextBlink.push(val1);
                nextBlink.push(val2);
            } else {
                const val = (parseInt(prevBlink[i]) * 2024).toString();
                nextBlink.push(val);
            }
        }
        prevBlink = [...nextBlink];
        nextBlink = [];
    }
    console.log(prevBlink.length);
};

const part2 = () => {
    const stones = getInputText(11).split(" ");

    let stoneCount = new Map<string, number>();
    const nextMap = new Map<string, string[]>();
    nextMap.set("0", ["1"]); // 0 => 1 rule

    for (let i = 0; i < stones.length; i++) {
        if (stoneCount.has(stones[i])) stoneCount.set(stones[i], stoneCount.get(stones[i])! + 1);
        else stoneCount.set(stones[i], 1);
    }

    // blink
    for (let blink = 0; blink < 75; blink++) {
        const nextCount = new Map<string, number>();
        for (const [stone, count] of stoneCount) {
            if (nextMap.has(stone)) {
                nextMap.get(stone)!.forEach(nextstone => nextCount.set(nextstone, (nextCount.get(nextstone) ?? 0) + count));
            } else if (stone.length % 2 == 0) {
                const val1 = parseInt(stone.substring(0, stone.length / 2)).toString();
                const val2 = parseInt(stone.substring(stone.length / 2, stone.length)).toString();
                nextCount.set(val1, (nextCount.get(val1) ?? 0) + count);
                nextCount.set(val2, (nextCount.get(val2) ?? 0) + count);
                nextMap.set(stone, [val1, val2]);
            } else {
                const val = (parseInt(stone) * 2024).toString();
                nextCount.set(val, (nextCount.get(val) ?? 0) + count);
                nextMap.set(stone, [val]);
            }
        }
        stoneCount = nextCount;
    }
    let sum = 0;
    for (const [_, count] of stoneCount) {
        sum += count;
    }
    console.log(sum);
};

part2();
