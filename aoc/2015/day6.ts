import { writeFileSync } from "fs";
import { getInputLines } from "./util";

class LightGrid {
    lights: number[][] = Array.from(Array(1000), _ => Array(1000).fill(0));

    private splitCoords = (coordStr: string) => coordStr.split(",").map(x => parseInt(x));

    instruct(ins: string) {
        const words = ins.split(" ");
        if (words[0] == "turn") {
            if (words[1] == "on") {
                this.turnon(this.splitCoords(words[2]), this.splitCoords(words[4]));
            } else if (words[1] == "off") {
                this.turnoff(this.splitCoords(words[2]), this.splitCoords(words[4]));
            } else { throw new Error(`couldn't process instruction: ${ins}`); }
        } else if (words[0] == "toggle") {
            this.toggle(this.splitCoords(words[1]), this.splitCoords(words[3]));
        } else { throw new Error(`couldn't handle instruction: ${ins}`); }
    }

    turnon(begin: number[], end: number[]) {
        for (let i = begin[0]; i <= end[0]; i++) {
            for (let j = begin[1]; j <= end[1]; j++) {
                this.lights[i][j] += 1;
            }
        }
    }
    turnoff(begin: number[], end: number[]) {
        for (let i = begin[0]; i <= end[0]; i++) {
            for (let j = begin[1]; j <= end[1]; j++) {
                if (this.lights[i][j] > 0) this.lights[i][j] -= 1;
            }
        }
    }
    toggle(begin: number[], end: number[]) {
        for (let i = begin[0]; i <= end[0]; i++) {
            for (let j = begin[1]; j <= end[1]; j++) {
                this.lights[i][j] += 2;
            }
        }
    }
    lightson() {
        let sum = 0;
        for (let i = 0; i < this.lights.length; i++) {
            for (let j = 0; j < this.lights[i].length; j++) {
                sum += this.lights[i][j];
            }
        }
        return sum;
    }
    tofile() {
        let outstr = "";
        for (let i = 0; i < this.lights.length; i++) {
            for (let j = 0; j < this.lights[i].length; j++) {
                if (this.lights[i][j]) outstr += this.lights[i][j];
                else outstr += " ";
            }
            outstr += "\n";
        }
        writeFileSync("./day6.out", outstr);
    }
}

const part1 = async () => {
    const instructions = getInputLines(6);
    const lights = new LightGrid();
    lights.tofile();
    for (const inst of instructions) {
        lights.instruct(inst);
    }
    console.log(lights.lightson());
};

part1();

// part 2 involved changing the class