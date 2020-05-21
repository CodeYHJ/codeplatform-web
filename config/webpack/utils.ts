import path from "path";
export const pathFn = (url:string) => {
  const root = path.resolve(__dirname,'../..')
  return path.resolve(root, url);
};
