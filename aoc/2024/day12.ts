import { getInputLines } from "./util";

const grabRegion = (label: string, pos: [number, number], map: string[]) => {
    let region = new Set<string>();
    region.add(JSON.stringify(pos));
    const dirs: [number, number][] = [[pos[0], pos[1] - 1], [pos[0] + 1, pos[1]], [pos[0], pos[1] + 1], [pos[0] - 1, pos[1]]];
    for (const dir of dirs) {
        if (dir[0] < 0 || dir[1] < 0 || dir[0] >= map[0].length || dir[1] >= map[1].length) continue;
        if (map[dir[1]][dir[0]] == label) {
            map[dir[1]] = `${map[dir[1]].substring(0, dir[0])}.${map[dir[1]].substring(dir[0] + 1)}`;
            region = region.union(grabRegion(label, dir, map));
        }
    }
    return region;
};

const part1 = () => {
    const strLines = getInputLines(12);
    const labeledPos = new Map<string, Set<string>>(); // strings in set are JSON.stringify([number, number])
    let regionId = 0;
    for (let y = 0; y < strLines.length; y++) {
        for (let x = 0; x < strLines[y].length; x++) {
            if (strLines[y][x] == '.') continue;
            labeledPos.set(`${strLines[y][x]}${regionId}`, grabRegion(strLines[y][x], [x, y], strLines));
            regionId += 1;
        }
    }

    let sum = 0;
    for (const [label, positions] of labeledPos) {
        let perim = 0;
        for (const position of positions) {
            const [x, y] = JSON.parse(position) as [number, number];
            let localPerim = 4;
            const dirs = [[x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y]];
            for (const dir of dirs)
                if (positions.has(JSON.stringify(dir))) localPerim -= 1;
            perim += localPerim;
        }
        // console.log(`${label} : ${positions.size} * ${perim} = ${perim * positions.size}`);
        sum += perim * positions.size;
    }
    console.log(sum);
};

part1();

/*
AAA
AA

perimeter contribution = 4 - adjacent

*/