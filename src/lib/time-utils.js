import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
  startOfToday,
  startOfYesterday,
} from "date-fns";

import queryString from "query-string";

import { CONNECTION_GAMES } from "./data";

export const getToday = () => startOfToday();
export const getYesterday = () => startOfYesterday();

// 10 October 2023 Game Epoch
export const firstGameDate = new Date(2023, 10, 10);
export const periodInDays = 10;

export const getLastGameDate = (today) => {
  const t = startOfDay(today);
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays;
  return addDays(t, -daysSinceLastGame);
};

export const getNextGameDate = (today) => {
  return addDays(getLastGameDate(today), periodInDays);
};

export const isValidGameDate = (date) => {
  if (date < firstGameDate || date > getToday()) {
    return false;
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0;
};

export const getIndex = (gameDate) => {
  let start = firstGameDate;
  let index = -1;
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);

  return index;
};

export const getPuzzleOfDay = (index) => {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  return CONNECTION_GAMES[index % CONNECTION_GAMES.length];
};

export const getSolution = (gameDate) => {
  const nextGameDate = getNextGameDate(gameDate);
  const index = getIndex(gameDate);
  const puzzleOfTheDay = getPuzzleOfDay(index);
  return {
    solution: puzzleOfTheDay,
    solutionGameDate: gameDate,
    solutionIndex: index,
    dateOfNextGame: nextGameDate.valueOf(),
  };
};

export const getGameDate = () => {
  if (getIsLatestGame()) {
    return getToday();
  }

  const parsed = queryString.parse(window.location.search);
  try {
    const d = startOfDay(parseISO(parsed.d?.toString()));
    if (d >= getToday() || d < firstGameDate) {
      setGameDate(getToday());
    }
    return d;
  } catch (e) {
    console.log(e);
    return getToday();
  }
};

export const setGameDate = (d) => {
  try {
    if (d < getToday()) {
      window.location.href = "/?d=" + formatISO(d, { representation: "date" });
      return;
    }
  } catch (e) {
    console.log(e);
  }
  window.location.href = "/";
};

export const getIsLatestGame = () => {
  const parsed = queryString.parse(window.location.search);
  return parsed === null || !("d" in parsed);
};

export const { solution, solutionGameDate, solutionIndex, dateOfNextGame } =
  getSolution(getGameDate());
