import { Config } from "./config";

export const threeSpace = (position: number, max: number): number => position - max / 2;
export const zZero = (config: Config): number => config.columnLength + 40 - config.zGantryOffset;
