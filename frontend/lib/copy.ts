export const copy = (obj: any) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    const deepCopyArray: any = [];
    for (let idx of obj) {
      deepCopyArray.push(copy(obj[idx]));
    }
    return deepCopyArray;
  } else {
    const deepCopyObj: any = {};
    for (let key in obj) {
      deepCopyObj[key] = copy(obj[key]);
    }
    return deepCopyObj;
  }
};
