/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjEmpty = (obj: any) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
