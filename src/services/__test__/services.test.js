import numberToTextConverter from '../numberToTextConverter';
import textToNumberConverter from '../textToNumberConverter';

const numbers_text = {
  0: 'zero',
  1: 'one',
  10: 'ten',
  27: 'twenty seven',
  30: 'thirty',
  100: 'one hundred',
  404: 'four hundred four',
  72101: 'seventy two thousand one hundred one',
  1000000: 'one million',
  1234567: 'one million two hundred thirty four thousand five hundred sixty seven',
  999999999: 'nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
};

const invalid_numbers = [
  -2, 1234567999, 3.2, 'aa', '123',
];

const invalid_text = [
  'for', 'one thousand hello', '1g', 123, 'one one', 'one twenty', 'forty forty'
];

describe('Number to text', () => {
  for (const item in numbers_text) {
    it(`should convert ${item} to text`, () => {
        expect(numberToTextConverter(parseInt(item))).toEqual(numbers_text[item]);
    })
  }

  invalid_numbers.forEach(number => {
    it(`should not convert invalid number ${number}`, () => {
      expect(numberToTextConverter(number)).toEqual('Invalid number')
    })
  }) 
})

describe('Text to number', () => {
  for (const item in numbers_text) {
    it(`should convert ${numbers_text[item]} to number`, () => {
      expect(textToNumberConverter(numbers_text[item])).toEqual(parseInt(item));
    })
  }

  if('should convert FIve huNdred to number', () => {
    expect(textToNumberConverter('FIve huNdred')).toEqual(500);
  })

  invalid_text.forEach(text => {
    it(`should not convert invalid text ${text}`, () => {
      expect(textToNumberConverter(text)).toEqual('Invalid text')
    })
  }) 
})
