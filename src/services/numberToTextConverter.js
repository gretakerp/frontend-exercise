import {
  digitsAndTeens, tens, multipiers,
  MIN_NUMBER, MAX_NUMBER,
} from '../constants';

const convertByThousands = (number, multiplyBy, text) => {
  const hundreds = number % 1000;
  const numberWithoutHundreds = (number-hundreds) / 1000;
  let textToAdd = ` ${hundredsToText(hundreds)} ${multiplyBy > 0 && hundreds !== 0 ? multipiers[Math.pow(10, multiplyBy)] : ''}`;

  if (numberWithoutHundreds !== 0) {
    textToAdd = convertByThousands(numberWithoutHundreds, multiplyBy += 3, text) + textToAdd;
  }
  return textToAdd;
};

const firstDigit = number => number.toString()[0];

const hundredsToText = (hundreds) => {
  if (hundreds > 99) {
    return `${digitsAndTeens[firstDigit(hundreds)]} ${multipiers[100]} ${tensToText(hundreds % 100)}`;
  }
  return tensToText(hundreds);
};

const tensToText = (tensNumber) => {
  if (tensNumber > 19) {
    const digit = tensNumber % 10;
    return `${tens[tensNumber - digit]} ${digit !== 0 ? digitsAndTeens[digit] : ''}`;
  }
  if (tensNumber !== 0) {
    return digitsAndTeens[parseInt(tensNumber)];
  }
  return '';
};

const numberToTextConverter = (initialNumber) => {
  if (initialNumber < MIN_NUMBER || initialNumber > MAX_NUMBER || !Number.isInteger(initialNumber)) {
    return 'Invalid number';
  } else if (initialNumber === 0) {
    return digitsAndTeens[initialNumber];
  }
  return convertByThousands(initialNumber, 0, '').trim();
};

export default numberToTextConverter;
