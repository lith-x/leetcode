import { getInputLines } from "./util";

const part1 = () => {
    const input = getInputLines(2);
    const dims = input.map(line => line.split("x").map(len => parseInt(len)));
    let wrapsum = 0;
    for (let i = 0; i < dims.length; i++) {
        let maxj = 0;
        for (let j = 0; j < dims[i].length; j++) {
            if (dims[i][j] > dims[i][maxj]) maxj = j;
        }
        wrapsum += 2 * dims[i][0] * dims[i][1]
            + 2 * dims[i][0] * dims[i][2]
            + 2 * dims[i][1] * dims[i][2]
            + dims[i][(maxj + 1) % 3] * dims[i][(maxj + 2) % 3];
    }
    console.log(wrapsum);
};

const part2 = () => {
    const input = getInputLines(2);
    const dims = input.map(line => line.split("x").map(len => parseInt(len)));
    let wrapsum = 0;
    for (let i = 0; i < dims.length; i++) {
        let maxj = 0;
        for (let j = 0; j < dims[i].length; j++) {
            if (dims[i][j] > dims[i][maxj]) maxj = j;
        }
        wrapsum += 2 * dims[i][(maxj + 1) % 3] + 2 * dims[i][(maxj + 2) % 3] + dims[i][0] * dims[i][1] * dims[i][2];
    }
    console.log(wrapsum);
};

part2();