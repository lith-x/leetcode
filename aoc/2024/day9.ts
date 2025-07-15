import { getInputText } from "./util";

const part1 = () => {
    const disk_descriptor = getInputText(9);
    const disk: number[] = [];
    let id = 0;
    for (let i = 0; i < disk_descriptor.length; i++) {
        const num = parseInt(disk_descriptor[i]);
        for (let j = 0; j < num; j++) {
            disk.push(i % 2 == 0 ? id : -1);
        }
        id += i % 2 == 0 ? 1 : 0;
    }
    let free_space = disk.filter(val => val == -1).length;
    while (free_space > 0) {
        const num = disk.pop() as number;
        if (num == -1) { free_space -= 1; continue; }
        disk[disk.indexOf(-1)] = num;
        free_space -= 1;
    }
    let sum = 0;
    for (let i = 0; i < disk.length; i++) {
        sum += disk[i] * i;
    }
    console.log(sum);
};

type MemBlock = { id: number, idx: number, len: number };

const descriptor_to_blocks = (descriptor: string) => {
    const blocks: MemBlock[] = [];
    let id = 0;
    let idx = 0;
    let temp = blocks;
    for (let i = 0; i < descriptor.length; i++) {
        const num = parseInt(descriptor[i]);
        if (num == 0 || i % 2 == 1) { idx += num; continue; }
        blocks.push({ id, idx, len: num });
        idx += num;
        id += 1;
    }
    return blocks;
};

const allocate = (id: number, blocks: MemBlock[]) => {
    const block = blocks.find(b => b.id == id);
    if (!block) throw `Block of id:${id} doesn't exist in array.`;
    for (let i = 0; i < blocks.length - 1; i++) {
        const space = blocks[i + 1].idx - (blocks[i].idx + blocks[i].len);
        if (space >= block.len && blocks[i + 1].idx <= block.idx) {
            block.idx = blocks[i].idx + blocks[i].len;
            blocks.splice(blocks.findIndex(b => b.id == id), 1);
            blocks.splice(i + 1, 0, block);
            return;
        }
    }
};

const part2 = () => {
    const disk_descriptor = getInputText(9);
    const blocks = descriptor_to_blocks(disk_descriptor);
    const id = blocks.length - 1;
    for (let i = id; i >= 0; i--) allocate(i, blocks);
    let sum = 0;
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].len; j++) {
            sum += (blocks[i].idx + j) * blocks[i].id;
        }
    }
    console.log(sum);
};

part2();