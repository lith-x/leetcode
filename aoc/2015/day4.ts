import { createHash } from "crypto";
import { getInputText } from "./util";

const part1 = () => {
    const key = getInputText(4);
    let i = 1;
    while (true) {
        const hash = createHash("md5").update(key + i).digest("hex");
        if (hash.indexOf("00000") == 0) break;
        i++;
    }
    console.log(i);
};

const part2 = () => {
    const key = "ckczppom";
    let i = 1;
    while (true) {
        const hash = createHash("md5").update(key + i).digest("hex");
        if (hash.indexOf("000000") == 0) break;
        i++;
    }
    console.log(i);
};

part2();