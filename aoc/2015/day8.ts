import { getInputLines } from "./util";

const part1 = () => {
    const names = getInputLines(8);
    let sum = 0;
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const encoded = name.replace(/^"/, "").replace(/"$/, "").replace(/\\\\/g, " ").replace(/\\"/g, " ").replace(/\\x[0-9a-f]{2}/g, " ");
        sum += name.length - encoded.length;
    }
    console.log(sum);
};

const part2 = () => {
    const names = getInputLines(8);
    let sum = 0;
    for (const name of names) {
        const encoded = '"' + name.replace(/"/g, "  ").replace(/\\/g, "  ") + '"';
        sum += encoded.length - name.length;
    }
    console.log(sum);
};

part2();