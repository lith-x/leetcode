import { getInputLines } from "./util";

const getXmas = (str: string) => str.matchAll(/XMAS/g).toArray().length + str.matchAll(/SAMX/g).toArray().length;

const part1 = () => {
    const lines = getInputLines(4);
    let xmas = 0;
    // horizontal
    getXmas(lines[0]);
    for (const line of lines) {
        xmas += getXmas(line);
    }
    // vertical
    for (let j = 0; j < lines[0].length; j++) {
        let vert = "";
        for (let i = 0; i < lines.length; i++) {
            vert += lines[i][j];
        }
        xmas += getXmas(vert);
    }
    // right diags
    for (let i = lines.length - 1; i >= 0; i--) {
        let diag = "";
        for (let j = 0; i + j < lines.length; j++) {
            diag += lines[i + j][j];
        }
        xmas += getXmas(diag);
    }
    for (let i = 1; i < lines.length; i++) {
        let diag = "";
        for (let j = 0; i + j < lines.length; j++) {
            diag += lines[j][i + j];
        }
        xmas += getXmas(diag);
    }
    // left diags
    for (let i = 0; i < lines.length; i++) {
        let diag = "";
        for (let j = i; j >= 0; j--) {
            diag += lines[i - j][j];
        }
        xmas += getXmas(diag);
    }
    for (let i = lines.length; i >= 1; i--) {
        let diag = "";
        for (let j = 1; i - j > 0; j++) {
            diag += lines[lines.length - (i - j)][(i - j) + (lines.length - i)];
        }
        xmas += getXmas(diag);
    }
    console.log(xmas);
};

const part2 = () => {
    const lines = getInputLines(4);
    let xmas = 0;
    for (let i = 1; i < lines.length - 1; i++) {
        for (let j = 1; j < lines[i].length - 1; j++) {
            if (lines[i][j] != 'A') continue;
            xmas += (lines[i - 1][j - 1] + lines[i - 1][j + 1] + lines[i + 1][j + 1] + lines[i + 1][j - 1]).match(/MMSS|SMMS|SSMM|MSSM/) ? 1 : 0;
        }
    }
    console.log(xmas);
};
part2();
/*
[i][j]
x x x x
x x x x
x x x x
x x x x
[0][0]                [i - j][i]
[0][1] [1][0]
[0][2] [1][1] [2][0]
[0][3] [1][2] [2][1] [3][0]

[1][3] [2][2] [3][1]      0 (i = lines.length)
[2][3] [3][2]             1 (i = lines.length - 1)
[3][3]                    2 (i = lines.length - 2)
*/