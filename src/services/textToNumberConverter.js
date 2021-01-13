import {
  digitsAndTeens, tens, multipiers,
} from '../constants';

const INVALID_NUMBER = -1;

const findInList = (list, toFind) => parseInt(
    Object.keys(list).find(key => list[key].toLowerCase() === toFind.toLowerCase())
  );
const findInArray = (array, toFind) => array.findIndex(
  n => n.toLowerCase() === toFind.toLowerCase()
);

const isZero = (digit, count) => digit === 0 && count === 1;

const findNumber = (numberToFind, wordsCount) => {
  const tensNumber = findInList(tens, numberToFind);
  const digit = findInArray(digitsAndTeens, numberToFind);
  if (tensNumber > 0 || digit > 0 || isZero(digit, wordsCount)) {
    return tensNumber || digit;
  }
  return INVALID_NUMBER;
}

const findNumberAndStatus = (numberToFind, wordsCount) => {
  const result = {
    isMultipier: false, isNotMultipier: false, number: 0,
  };
  const multipier = findInList(multipiers, numberToFind);
  if (multipier > 0) {
    result.number = multipier;
    result.isMultipier = true;
    return result;
  }
  const number = findNumber(numberToFind, wordsCount);
  if (number !== INVALID_NUMBER) {
    result.isNotMultipier = true;
    result.number = number;
    return result;
  }
  return result;
}

const isTwoConsecutiveDigitsOrTeens = (current, previous) => digitsAndTeens[current] && digitsAndTeens[previous];
const isTwoConsecutiveTens = (current, previous) => (tens[current] && tens[previous]);
const isDigitBeforeTens = (current, previous) => (digitsAndTeens[previous] && tens[current]);

const isInvalidConsecutiveNumbers = (current, previous) => previous && (
  isTwoConsecutiveDigitsOrTeens(current, previous) ||
  isTwoConsecutiveTens(current, previous) ||
  isDigitBeforeTens(current, previous)
);

const textToNumberConverter = (initialText) => {
  if (typeof initialText !== "string") {
    return 'Invalid text'
  }
  const words = initialText.trim().split(' ');
  let resultNumber = 0;
  let previousHundreds = 0;
  let previousNumber;

  for (let i = 0; i < words.length; i++) {
    const { isMultipier, isNotMultipier, number } = findNumberAndStatus(words[i], words.length);
    if (isMultipier) {
      const multipiedNumber = previousHundreds * number - previousHundreds;
      resultNumber += multipiedNumber;
      if (number === 100) {
        previousHundreds += multipiedNumber;
      } else {
        previousHundreds = 0;
      }
    } else if (isNotMultipier && !isInvalidConsecutiveNumbers(number, previousNumber)) {
      resultNumber += number;
      previousHundreds += number;
    } else {
      return 'Invalid text';
    }
    previousNumber = number;
  }
  return resultNumber;
};

export default textToNumberConverter;
