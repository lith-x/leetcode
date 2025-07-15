import { getInputText } from "./util";

const part1 = () => {
    let input = getInputText(3);
    const position = [0,0]; // [x,y]
    const houses: {x: number, y: number}[] = [{x: position[0], y: position[1]}];
    for (let i = 0; i < input.length; i++) {
        switch(input[i]) {
            case '>': position[0] += 1; break;
            case '<': position[0] -= 1; break;
            case '^': position[1] -= 1; break;
            case 'v': position[1] += 1; break;
            default: throw new Error(`unexpected char: ${input[i]}`);
        }
        const idx = houses.findIndex(v => v.x == position[0] && v.y == position[1]);
        if (idx == -1) {
            houses.push({x: position[0], y: position[1]});
        }
    }
    console.log(houses.length);
};

const part2 = () => {
    let input = getInputText(3);
    const santaPos = [0,0]; // [x,y]
    const roboPos = [0,0];
    const houses: {x: number, y: number}[] = [{x: santaPos[0], y: santaPos[1]}];
    for (let i = 0; i < input.length; i++) {
        const pos = i % 2 == 0 ? santaPos : roboPos;
        switch(input[i]) {
            case '>': pos[0] += 1; break;
            case '<': pos[0] -= 1; break;
            case '^': pos[1] -= 1; break;
            case 'v': pos[1] += 1; break;
            default: throw new Error(`unexpected char: ${input[i]}`);
        }
        const idx = houses.findIndex(v => v.x == pos[0] && v.y == pos[1]);
        if (idx == -1) {
            houses.push({x: pos[0], y: pos[1]});
        }
    }
    console.log(houses.length);
};

part2();