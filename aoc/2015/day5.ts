import { getInputLines } from "./util";

const part1 = () => {
    const words = getInputLines(5);
    let niceCount = 0;
    for (let i = 0; i < words.length; i++) {
        const vowelCount = words[i].match(/[aeiou]/g)?.length;
        if(!vowelCount || vowelCount < 3) continue;
        let hasDouble = false;
        for (let j = 0; j < words[i].length - 1; j++) {
            if (words[i][j] == words[i][j + 1]) {
                hasDouble = true;
                break;
            }
        }
        if (!hasDouble) continue;

        const hasSubstrings = words[i].match(/ab|cd|pq|xy/g)?.length;
        if (hasSubstrings) continue;
        niceCount += 1;
    }
    console.log(niceCount);
};

const part2 = () => {
    const hasMatchingPairs = (word: string) => {
        for (let j = 0; j < word.length - 3; j++) {
            for (let k = j + 2; k < word.length - 1; k++) {
                if(word.slice(j, j + 2) == word.slice(k, k + 2)) {
                    return true;
                }
            }
        }
        return false;
    };
    const words = getInputLines(5);
    let niceCount = 0;
    for (let i = 0; i < words.length; i++) {
        let hasPattern = hasMatchingPairs(words[i]);
        if (!hasPattern) continue;

        hasPattern = false;
        for (let j = 0; j < words[i].length - 2; j++) {
            if (words[i][j] == words[i][j + 2]) {
                hasPattern = true;
                break;
            }
        }
        if (!hasPattern) continue;
        niceCount += 1;
    }
    console.log(niceCount);
};

part2();