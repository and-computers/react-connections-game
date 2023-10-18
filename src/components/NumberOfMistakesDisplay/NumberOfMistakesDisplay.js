import React from "react";
import { range } from "../../utils";
function SingleMistakeDisplay({ isUsed }) {
  // TODO: make this more like dynamic class name base on if used or not

  return <>{!isUsed && <p>X</p>}</>;
}

function NumberOfMistakesDisplay({ maxMistakes, numMistakesUsed }) {
  // array size of number of guess. [1, 2, 3, 4]
  const mistakeRange = range(maxMistakes);
  return (
    <div>
      <p>Mistakes Remaining: </p>
      {mistakeRange.map((el) => (
        <SingleMistakeDisplay key={el} isUsed={el < numMistakesUsed} />
      ))}
    </div>
  );
}

export default NumberOfMistakesDisplay;
