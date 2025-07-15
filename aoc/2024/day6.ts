import { getInputLines } from "./util";
const MAP_HEIGHT = 130;
const MAP_WIDTH = 130;

// 0 = north, 1 = east, 2 = south, 3 = west
type PathNode = { pos: Position, dir: number, next?: PathNode };
type Position = { x: number, y: number };

const pathToPositionArray = (start_node: PathNode) => {
    const positions: Position[] = [];
    let temp: PathNode | undefined = start_node;
    while (temp) {
        if (!positions.filter(val => val.x == temp!.pos.x && val.y == temp!.pos.y).length) {
            positions.push({ x: temp.pos.x, y: temp.pos.y });
        }
        temp = temp.next;
    }
    return positions;
};

const nodeInPath = (node: PathNode, pathHead: PathNode) => {
    let temp: PathNode | undefined = pathHead;
    while (temp) {
        if (temp.pos.x == node.pos.x && temp.pos.y == node.pos.y && temp.dir == node.dir) return true;
        temp = temp.next;
    }
    return false;
};

// populates start_node with guard path
const simulateGuardPath = (start_node: PathNode, obstructions: Position[]) => {
    let temp: PathNode | undefined = start_node;
    while (true) {
        let next_pos: Position;
        switch (temp.dir) {
            case 0: next_pos = { x: temp.pos.x, y: temp.pos.y - 1 }; break;
            case 1: next_pos = { x: temp.pos.x + 1, y: temp.pos.y }; break;
            case 2: next_pos = { x: temp.pos.x, y: temp.pos.y + 1 }; break;
            case 3: next_pos = { x: temp.pos.x - 1, y: temp.pos.y }; break;
            default: throw `invalid direction in node (${temp.pos.x},${temp.pos.y}): ${temp.dir}`;
        }
        if (next_pos.x < 0 || next_pos.x >= MAP_WIDTH || next_pos.y < 0 || next_pos.y >= MAP_HEIGHT) break;
        let next_node;
        if (obstructions.filter(obs => obs.x == next_pos.x && obs.y == next_pos.y).length > 0) {
            next_node = { pos: { x: temp.pos.x, y: temp.pos.y }, dir: (temp.dir + 1) % 4 };
        } else {
            next_node = { pos: { x: next_pos.x, y: next_pos.y }, dir: temp.dir };
        }
        if (nodeInPath(next_node, start_node)) return true;
        temp.next = next_node;
        temp = temp.next;
    }
    return false;
};

const part1 = () => {
    // Set up the input
    const mapStr = getInputLines(6);
    const obstructions: Position[] = [];
    const guard_init: PathNode = { pos: { x: 0, y: 0 }, dir: 0 };
    for (let y = 0; y < mapStr.length; y++) {
        for (let x = 0; x < mapStr[y].length; x++) {
            if (mapStr[y][x] == '#') obstructions.push({ x, y });
            else if (mapStr[y][x] == '^') {
                guard_init.pos.x = x;
                guard_init.pos.y = y;
            }
        }
    }
    simulateGuardPath(guard_init, obstructions);
    console.log(pathToPositionArray(guard_init).length);
};

const part2 = () => {
    const mapStr = getInputLines(6);
    const obstructions: Position[] = [];
    let g_x = 0; let g_y = 0; let g_d = 0;
    for (let y = 0; y < mapStr.length; y++) {
        for (let x = 0; x < mapStr[y].length; x++) {
            if (mapStr[y][x] == '#') obstructions.push({ x, y });
            else if (mapStr[y][x] == '^') {
                g_x = x;
                g_y = y;
            }
        }
    }
    const original_path: PathNode = { pos: { x: g_x, y: g_y }, dir: g_d };

    simulateGuardPath(original_path, obstructions);
    const possible_obstructions = pathToPositionArray(original_path).filter(val => val.x != g_x || val.y != g_y);
    let loops = 0;
    for (const new_obstruction of possible_obstructions) {
        const fresh_node: PathNode = { pos: { x: g_x, y: g_y }, dir: g_d };
        const modified_obstructions = [...obstructions, new_obstruction];
        if (simulateGuardPath(fresh_node, modified_obstructions)) loops += 1;
    }
    console.log(loops);
};

part2();