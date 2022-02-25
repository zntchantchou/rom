export function handleNumber(value: number) {
  // get first num, get second num
  if (value < 10) return handleDigit(value);
  if (value === 100) return "C";
  const exactOrBelow = handleExactOrBelow(value, floors, "I");
  if (exactOrBelow) return exactOrBelow;
  const [tens, digit] = value
    .toString()
    .split("")
    .map((n) => parseInt(n));

  const exactOrBelowTens = handleExactOrBelow(tens, tensFloors, "X");
  if (exactOrBelowTens) {
    return exactOrBelowTens + handleDigit(digit);
  }
  return handleOtherTens(tens) + handleDigit(digit);
}

export function handleDigit(value: number) {
  if (value === 0) return "";
  const res = handleExactOrBelow(value, unitFloors, "I");
  if (res) return res;
  return handleOtherDigits(value);
}
/**
 * if the value matches a floor value, returns said value
 * if value is floor - 1, returns
 * works on all values
 */

function handleExactOrBelow(
  value: number,
  floors: FloorValue[],
  offsetChar: string
) {
  let result;
  for (const uf of floors) {
    if (value === uf.value) {
      result = uf.char;
      break;
    }
    if (value === uf.value - 1) {
      return offsetChar + uf.char;
    }
  }
  return result;
}

function handleOtherDigits(value: number) {
  // find floorValue such that floorValue < value < nextFloorValue
  const floorValue = unitFloors
    .sort((a, b) => a.value - b.value)
    .reverse()
    .find((uf) => uf.value < value);
  if (floorValue) {
    const remainder = value - floorValue?.value;
    return floorValue.char + Array(remainder).fill("I").join("");
  }
}

function findFloor(value: number, floorValues: FloorValue[]) {
  const floorValue = floorValues
    .sort((a, b) => a.value - b.value)
    .reverse()
    .find((uf) => uf.value <= value);
  return floorValue;
}

function handleOtherTens(value: number) {
  // find floor;
  const result = [];
  const floor = findFloor(value, tensFloors);
  if (floor) {
    result.push(floor.char);
    const remainder = value - floor.value;
    result.push(Array(remainder).fill("X").join(""));
  }
  return result.join("");
}

type FloorValue = {
  value: number;
  char: string;
};

const unitFloors: FloorValue[] = [
  {
    value: 1,
    char: "I",
  },
  {
    value: 5,
    char: "V",
  },
  {
    value: 10,
    char: "X",
  },
];

const tensFloors: FloorValue[] = [
  {
    value: 1,
    char: "X",
  },
  {
    value: 5,
    char: "L",
  },
  {
    value: 10,
    char: "C",
  },
];

const floors: FloorValue[] = [
  {
    value: 10,
    char: "X",
  },
  {
    value: 50,
    char: "L",
  },
  {
    value: 100,
    char: "C",
  },
];
