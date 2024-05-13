import { Config } from "./config";

export const threeSpace = (position: number, max: number): number => position - max / 2;
export const zZero = (config: Config): number => config.columnLength + 40 - config.zGantryOffset;
export const getColorFromBrightness = (value: number) => {
  const colorMap: { [key: number]: string } = {
    1: "#444",
    2: "#555",
    3: "#666",
    4: "#777",
    5: "#888",
    6: "#999",
    7: "#aaa",
    8: "#bbb",
    9: "#ccc",
    10: "#ddd",
    11: "#eee",
    12: "#fff",
  };
  return colorMap[value];
};
