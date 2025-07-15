import { getInputLines } from "./util";

const part1 = () => {
    const strLines = getInputLines(7);
    const eqMap = new Map<number, number[]>();
    for (let i = 0; i < strLines.length; i++) {
        const [val, nums] = strLines[i].split(": ");
        eqMap.set(parseInt(val), nums.split(" ").map(x => parseInt(x)));
    }

    let sum = 0;
    for (const eq of eqMap) {
        const [val, nums] = eq;
        for (let addMultBits = 0; addMultBits < Math.pow(2, nums.length - 1); addMultBits++) {
            let bits = addMultBits;
            let result = nums[0];
            for (let i = 1; i < nums.length; i++) {
                const bit = bits & 1;
                if (bit == 1) { result *= nums[i]; }
                else { result += nums[i]; }
                bits >>= 1;
            }
            if (result == val) {
                sum += val;
                break;
            }
        }
    }
    console.log(sum);
};

const part2 = () => {
    const strLines = getInputLines(7);
    const eqMap = new Map<number, number[]>();
    for (let i = 0; i < strLines.length; i++) {
        const [val, nums] = strLines[i].split(": ");
        eqMap.set(parseInt(val), nums.split(" ").map(x => parseInt(x)));
    }

    let sum = 0;
    for (const eq of eqMap) {
        const [val, nums] = eq;
        // thank you number theory lol
        for (let opVals = 0; opVals < Math.pow(3, nums.length - 1); opVals++) {
            let bits = opVals;
            let result = nums[0];
            for (let i = 1; i < nums.length; i++) {
                const bit = bits % 3;
                if (bit == 2) { result *= nums[i]; }
                else if (bit == 1) { result = parseInt(`${result}${nums[i]}`); }
                else { result += nums[i]; }
                bits = Math.floor(bits / 3);
            }
            if (result == val) {
                sum += val;
                break;
            }
        }
    }
    console.log(sum);
};

part2();

/*

val: num1 num2 num3 num4
brute force
2^(num - 1) possibilities
1 = add
0 = multiply
for loop + bitmask

*/