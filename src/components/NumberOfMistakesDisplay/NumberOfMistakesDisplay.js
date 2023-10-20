import React from "react";
import { range } from "../../utils";
import { Circle, CircleSlash } from "lucide-react";

function SingleMistakeDisplay({ isUsed }) {
  return (
    <div>
      {isUsed ? (
        <CircleSlash className="h-4 w-4 mt-1 stroke-neutral-400" />
      ) : (
        <Circle className="h-4 w-4 mt-1 fill-green-300 stroke-cyan-300" />
      )}
    </div>
  );
}

function NumberOfMistakesDisplay({ maxMistakes, numMistakesUsed }) {
  // array size of number of guess. [1, 2, 3, 4]
  const mistakeRange = range(maxMistakes);
  return (
    <div className="flex flex-row gap-x-4">
      <p className="text-base">Mistakes Remaining: </p>
      {mistakeRange.map((el) => (
        <SingleMistakeDisplay key={el} isUsed={el < numMistakesUsed} />
      ))}
    </div>
  );
}

export default NumberOfMistakesDisplay;
