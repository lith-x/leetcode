import { getInputText } from "./util";

// X|Y => X(parent) -> Y(child)
const part1 = () => {
    const [orderStr, updateStr] = getInputText(5).split("\n\n");
    const orders = orderStr.split("\n").map(x => x.split("|").map(y => parseInt(y)));
    const updates = updateStr.split("\n").map(x => x.split(",").map(y => parseInt(y)));
    let sum = 0;
    nextupdate: for (const update of updates) {
        // i = base pointer
        for (let i = 0; i < update.length; i++) {
            // j = other pointer
            for (let j = 0; j < update.length; j++) {
                const [before, after] = j < i ? [j, i] : [i, j];
                const misordered = orders.filter(order => order[0] == update[after] && order[1] == update[before]).length > 0;
                if (misordered) continue nextupdate;
            }
        }
        sum += update[Math.ceil((update.length / 2) - 1)];
    }
    console.log(sum);
};

const part2 = () => {
    const [orderStr, updateStr] = getInputText(5).split("\n\n");
    const orders = orderStr.split("\n").map(x => x.split("|").map(y => parseInt(y)));
    const updates = updateStr.split("\n").map(x => x.split(",").map(y => parseInt(y)));

    const sortUpdate = (a: number, b: number) => {
        if (a == b) return 0;
        if (orders.filter(order => order[0] == a && order[1] == b).length > 0) return -1;
        return 1;
    };

    let sum = 0;
    nextupdate: for (const update of updates) {
        // i = base pointer
        for (let i = 0; i < update.length; i++) {
            // j = other pointer
            for (let j = 0; j < update.length; j++) {
                if (j == i) continue;
                const [before, after] = j < i ? [j, i] : [i, j];
                const misordered = orders.filter(order => order[0] == update[after] && order[1] == update[before]).length > 0;
                if (misordered) {
                    update.sort(sortUpdate);
                    sum += update[Math.ceil((update.length / 2) - 1)];
                    continue nextupdate;
                }
            }
        }
    }
    console.log(sum);
};

part2();