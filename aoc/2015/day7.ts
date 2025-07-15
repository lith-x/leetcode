import { writeFileSync } from "fs";
import { getInputLines } from "./util";

type Instruction = {
    in1: number /* if int */ | string /* if var */,
    in2?: number | string,
    op: "AND" | "OR" | "LSHIFT" | "RSHIFT" | "NOT" | "ASSIGN"
    out: string
};

const insList: Instruction[] = [];
const valList: { name: string, val: number }[] = [];

// Gets val from valList if exists. If in1/in2 is just a number, returns that. If does not exist in valList, returns NaN.
const getVal = (valNum: number, inst: Instruction) => {
    const varName = inst[valNum == 1 ? "in1" : "in2"];
    if (typeof varName == "number") return varName;
    const valIdx = valList.findIndex(v => v.name === varName);
    if (valIdx == -1) return NaN;
    return valList[valIdx].val;
}

const part1 = () => {
    const lines = getInputLines(7);

    // Parse input (hacky)
    for (const line of lines) {
        const tokens = line.split(" ");
        if (tokens[0] == "NOT") {
            insList.push({ op: "NOT", in1: tokens[1], out: tokens[3] });
        } else {
            switch (tokens[1]) {
                case "AND": {
                    const ifNum = parseInt(tokens[0]);
                    insList.push({ op: "AND", in1: Number.isNaN(ifNum) ? tokens[0] : ifNum, in2: tokens[2], out: tokens[4] });
                    break;
                } case "OR": {
                    insList.push({ op: "OR", in1: tokens[0], in2: tokens[2], out: tokens[4] });
                    break;
                } case "LSHIFT": {
                    insList.push({ op: "LSHIFT", in1: tokens[0], in2: parseInt(tokens[2]), out: tokens[4] });
                    break;
                } case "RSHIFT": {
                    insList.push({ op: "RSHIFT", in1: tokens[0], in2: parseInt(tokens[2]), out: tokens[4] });
                    break;
                } case "->": {
                    const ifNum = parseInt(tokens[0]);
                    insList.push({ op: "ASSIGN", in1: Number.isNaN(ifNum) ? tokens[0] : ifNum, out: tokens[2] });
                    break;
                } default:
                    throw new Error(`Could not process: ${line}`);
            }
        }
    }

    // Initial assignment: (int) -> var
    for (const inst of insList.filter(v => v.op == "ASSIGN" && typeof v.in1 == "number")) {
        valList.push({ name: inst.out, val: inst.in1 as number });
        insList.splice(insList.indexOf(inst), 1);
    }

    // Go through instruction list, assign then remove instruction from list if possible, do until all values are assigned.
    while (insList.length > 0) {
        for (const inst of insList) {
            switch (inst.op) {
                case "ASSIGN": {
                    const val1 = getVal(1, inst);
                    if (Number.isNaN(val1)) continue;
                    valList.push({ name: inst.out, val: val1 });
                    insList.splice(insList.indexOf(inst), 1);
                    break;
                } case "AND": {
                    const val1 = getVal(1, inst);
                    if (Number.isNaN(val1)) continue;
                    const val2 = getVal(2, inst);
                    if (Number.isNaN(val2)) continue;
                    valList.push({ name: inst.out, val: val1 & val2 });
                    insList.splice(insList.indexOf(inst), 1);
                    break;
                } case "OR": {
                    const val1 = getVal(1, inst);
                    if (Number.isNaN(val1)) continue;
                    const val2 = getVal(2, inst);
                    if (Number.isNaN(val2)) continue;
                    valList.push({ name: inst.out, val: val1 | val2 });
                    insList.splice(insList.indexOf(inst), 1);
                    break;
                } case "LSHIFT": {
                    const val1 = getVal(1, inst);
                    if (Number.isNaN(val1)) continue;
                    const val2 = getVal(2, inst);
                    if (Number.isNaN(val2)) continue;
                    valList.push({ name: inst.out, val: val1 << val2 });
                    insList.splice(insList.indexOf(inst), 1);
                    break;
                } case "RSHIFT": {
                    const val1 = getVal(1, inst);
                    if (Number.isNaN(val1)) continue;
                    const val2 = getVal(2, inst);
                    if (Number.isNaN(val2)) continue;
                    valList.push({ name: inst.out, val: val1 >> val2 });
                    insList.splice(insList.indexOf(inst), 1);
                    break;
                } case "NOT": {
                    const val1 = getVal(1, inst);
                    if (Number.isNaN(val1)) continue;
                    valList.push({ name: inst.out, val: ~val1 });
                    insList.splice(insList.indexOf(inst), 1);
                    break;
                } default:
                    throw new Error(`Unknown operation: ${inst.op}`);
            }
        }
    }

    console.log(valList.filter(v => v.name == "a")[0].val);
};

part1();
// part 2 was just modifying the input, thank god