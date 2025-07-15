import { getInputLines } from "./util";

type Pos = { x: number, y: number, num: number };

const moveHiker = (pos: Pos, map: number[][], peaks_reached: Set<string>) => {
    if (pos.num == 9) return `${pos.x},${pos.y}`;
    const dirs: Pos[] = [{ x: pos.x, y: pos.y - 1, num: pos.num + 1 },
        { x: pos.x + 1, y: pos.y, num: pos.num + 1 },
        { x: pos.x, y: pos.y + 1, num: pos.num + 1 },
        { x: pos.x - 1, y: pos.y, num: pos.num + 1 }];
    for (let i = 0; i < dirs.length; i++) {
        if (dirs[i].x < 0 || dirs[i].x >= map.length || dirs[i].y < 0 || dirs[i].y >= map[0].length)
            continue;
        if (map[dirs[i].y][dirs[i].x] == pos.num + 1)
            peaks_reached.add(moveHiker(dirs[i], map, peaks_reached));
    }
    return "none";
};

const part1 = () => {
    // find 0's, find all paths from each 0 that reaches 9's, how many 9's is the score.
    const map = getInputLines(10).map(x => x.split("").map(y => parseInt(y)));
    const trailheads: Pos[] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == 0) trailheads.push({ x, y, num: 0 });
        }
    }
    let sum = 0;
    for (let i = 0; i < trailheads.length; i++) {
        const peaks_reached = new Set<string>();
        moveHiker(trailheads[i], map, peaks_reached);
        peaks_reached.delete("none");
        sum += peaks_reached.size;
    }
    console.log(sum);
};

const moveHikerUnique = (pos: Pos, map: number[][]) => {
    if (pos.num == 9) return 1;
    const scores = [0,0,0,0];
    const dirs: Pos[] = [{ x: pos.x, y: pos.y - 1, num: pos.num + 1 },
        { x: pos.x + 1, y: pos.y, num: pos.num + 1 },
        { x: pos.x, y: pos.y + 1, num: pos.num + 1 },
        { x: pos.x - 1, y: pos.y, num: pos.num + 1 }];
    for (let i = 0; i < dirs.length; i++) {
        if (dirs[i].x < 0 || dirs[i].x >= map.length || dirs[i].y < 0 || dirs[i].y >= map[0].length)
            continue;
        if (map[dirs[i].y][dirs[i].x] == pos.num + 1) {
            scores[i] += moveHikerUnique(dirs[i], map);
        }
    }
    return scores.reduce((a, b) => a + b);
};

const part2 = () => {
    // find 0's, find all paths from each 0 that reaches 9's, how many 9's is the score.
    const map = getInputLines(10).map(x => x.split("").map(y => parseInt(y)));
    const trailheads: Pos[] = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] == 0) trailheads.push({ x, y, num: 0 });
        }
    }
    let sum = 0;
    for (let i = 0; i < trailheads.length; i++) {
        sum += moveHikerUnique(trailheads[i], map);
    }
    console.log(sum);
};

part2();