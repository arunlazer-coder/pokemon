export const isArray = (data:[]) => {
    return (data && Array.isArray(data) && data.length)
}

export const capitalize = (str:string) => {
   return str.charAt(0).toUpperCase() + str.slice(1)
}

export const findCommonData=(arr:string[]) =>{
  if (arr.length === 0) {
    return [];
  }
  const commonData = [];

  for (const element of arr[0]) {
    let isCommon = true;

    for (let i = 1; i < arr.length; i++) {
      if (!arr[i].includes(element)) {
        isCommon = false;
        break;
      }
    }

    if (isCommon) {
      commonData.push(element);
    }
  }

  return commonData;
}
