import { getInputLines } from "./util";

const part1 = () => {
    const strLines = getInputLines(8);
    const antennae = new Map<string, { x: number, y: number }[]>();
    for (let y = 0; y < strLines.length; y++) {
        for (let x = 0; x < strLines[y].length; x++) {
            const char = strLines[y][x];
            if (char == '.') continue;
            if (antennae.has(char)) antennae.get(char)!.push({ x, y });
            else antennae.set(char, [{ x, y }]);
        }
    }
    const MAP_HEIGHT = strLines.length;
    const MAP_WIDTH = strLines[0].length;

    let antinodes = new Set<string>();
    for (const group of antennae) {
        const [_, locs] = group;
        for (let i = 0; i < locs.length - 1; i++) {
            for (let j = i + 1; j < locs.length; j++) {
                const dx = locs[i].x - locs[j].x;
                const dy = locs[i].y - locs[j].y;
                const antinodeX1 = locs[i].x + dx;
                const antinodeY1 = locs[i].y + dy;
                const antinodeX2 = locs[j].x - dx;
                const antinodeY2 = locs[j].y - dy;
                if (antinodeX1 >= 0 && antinodeX1 < MAP_WIDTH && antinodeY1 >= 0 && antinodeY1 < MAP_HEIGHT)
                    antinodes.add(`${antinodeX1},${antinodeY1}`);
                if (antinodeX2 >= 0 && antinodeX2 < MAP_WIDTH && antinodeY2 >= 0 && antinodeY2 < MAP_HEIGHT)
                    antinodes.add(`${antinodeX2},${antinodeY2}`);
            }
        }
    }
    console.log(antinodes.size);
};

const part2 = () => {
    const strLines = getInputLines(8);
    const antennae = new Map<string, { x: number, y: number }[]>();
    for (let y = 0; y < strLines.length; y++) {
        for (let x = 0; x < strLines[y].length; x++) {
            const char = strLines[y][x];
            if (char == '.') continue;
            if (!antennae.has(char)) antennae.set(char, []);
            antennae.get(char)!.push({ x, y });
        }
    }
    const MAP_HEIGHT = strLines.length;
    const MAP_WIDTH = strLines[0].length;

    let antinodes = new Set<string>();
    for (const group of antennae) {
        const [_, locs] = group;
        locs.forEach(val => antinodes.add(`${val.x},${val.y}`));
        for (let i = 0; i < locs.length - 1; i++) {
            for (let j = i + 1; j < locs.length; j++) {
                const dx = locs[i].x - locs[j].x;
                const dy = locs[i].y - locs[j].y;
                let antinodeX1 = locs[i].x + dx;
                let antinodeY1 = locs[i].y + dy;
                let antinodeX2 = locs[j].x - dx;
                let antinodeY2 = locs[j].y - dy;
                while (antinodeX1 >= 0 && antinodeX1 < MAP_WIDTH && antinodeY1 >= 0 && antinodeY1 < MAP_HEIGHT) {
                    antinodes.add(`${antinodeX1},${antinodeY1}`);
                    antinodeX1 += dx;
                    antinodeY1 += dy;
                }
                while (antinodeX2 >= 0 && antinodeX2 < MAP_WIDTH && antinodeY2 >= 0 && antinodeY2 < MAP_HEIGHT) {
                    antinodes.add(`${antinodeX2},${antinodeY2}`);
                    antinodeX2 -= dx;
                    antinodeY2 -= dy;
                }
            }
        }
    }
    console.log(antinodes.size);
};

part2();