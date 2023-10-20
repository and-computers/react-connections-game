import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//https://www.joshwcomeau.com/snippets/javascript/random/
export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

// https://www.joshwcomeau.com/snippets/javascript/range/
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

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
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
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  const difference = differenceOfArrays(arr1, arr2);

  return difference.length === 0 && arr1.length === arr2.length;
};
