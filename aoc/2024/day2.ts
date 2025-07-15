import { getInputLines } from "./util"

/** 
 * v1: first val, v2: second val, inc: 1 if increasing, -1 if decreasing, 0 if init (default)
 * returns: v1 -> v2 is valid, will return inc, 2 otherwise
 */
const isChangeValid = (v1: number, v2: number, inc = 0) => {
    const diff = v1 - v2;
    if (inc == 1 && diff <= -1 && diff >= -3
        || inc == -1 && diff >= 1 && diff <= 3) return inc;
    if (inc == 0 && diff >= -3 && diff <= 3 && diff != 0) return diff < 0 ? 1 : -1;
    return 2;
};

const isReportValid = (report: number[]) => {
    const inc = isChangeValid(report[0], report[1]);
    if (inc == 2) return false;
    for (let i = 1; i < report.length - 1; i++) {
        if (isChangeValid(report[i], report[i + 1], inc) != inc)
            return false;
    }
    return true;
};

const part1 = () => {
    const reports = getInputLines(2).map(x => x.split(" ").map(x => parseInt(x)));
    let valids = 0;
    for (const report of reports) {
        if (isReportValid(report)) valids += 1;
    }
    console.log(valids);
};

const part2 = () => {
    const reports = getInputLines(2).map(x => x.split(" ").map(x => parseInt(x)));
    let valids = 0;
    for (const report of reports) {
        if (isReportValid(report)) {
            valids += 1;
            continue;
        }
        for (let i = 0; i < report.length; i++) {
            if (isReportValid(report.toSpliced(i, 1))) {
                valids += 1;
                break;
            }
        }
    }
    console.log(valids);
};

part1();