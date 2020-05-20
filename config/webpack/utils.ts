import path from "path";

export const pathFn = (url: string) => {
  return path.resolve(process.env.PWD, url);
};
