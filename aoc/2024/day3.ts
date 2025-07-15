import { getInputText } from "./util";

const part1 = () => {
    const program = getInputText(3);
    const muls = program.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
    let total = 0;
    for (const mul of muls)
        total += parseInt(mul[1]) * parseInt(mul[2]);
    console.log(total);
};

const part2 = () => {
    const program = getInputText(3);
    const muls = program.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g).toArray();
    let willAdd = true;
    let total = 0;
    for (const mul of muls) {
        if (mul[0] == "do()") willAdd = true;
        else if (mul[0] == "don't()") willAdd = false;
        else {
            if (willAdd)
                total += parseInt(mul[1]) * parseInt(mul[2]);
        }
    }
    console.log(total);
};

part2();