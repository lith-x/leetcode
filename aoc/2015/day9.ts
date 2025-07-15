import { getInputLines } from "./util";


const part1 = () => {
    const lines = getInputLines(9);
    const edges: { a: string, b: string, dist: number }[] = [];

    for (const line of lines) {
        const tokens = line.split(" ");
        edges.push({ a: tokens[0], b: tokens[2], dist: parseInt(tokens[4]) });
    }

    const findShortestPath = () => {};
};

part1();