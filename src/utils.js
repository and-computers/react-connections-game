export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const sample = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const chunk = (chunkSize, array) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const sub = array.slice(i, i + chunkSize);
    chunkedArray.push(sub);
  }
  return chunkedArray;
};

export const differenceOfArrays = (arr1, arr2) => {
  return [...arr1].filter((x) => !arr2.includes(x));
};

export const doArraysHaveSameValues = (arr1, arr2) => {
  const difference = differenceOfArrays(arr1, arr2);

  return difference.length === 0 && arr1.length === arr2.length;
};
