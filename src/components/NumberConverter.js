import { useState } from 'react';
import numberToTextConverter from '../services/numberToTextConverter';
import textToNumberConverter from '../services/textToNumberConverter';

const NumberConverter = () => {
  const [output, setOutput] = useState('');

  const handleChange = (event) => {
    const input = event.target.value;
    if (!input.length) {
      setOutput('');
      return;
    }
    const inputNumberValue = Number(input);
    if (isNaN(inputNumberValue)) {
      setOutput(textToNumberConverter(input))
    } else if (Number.isInteger(inputNumberValue)) {
      setOutput(numberToTextConverter(inputNumberValue));
    } else {
      setOutput('');
    }
  };

  return (
    <>
      <textarea type='text' onChange={handleChange} id='number-input' />
      <div>
        <p id='output'>
          Output: {output}
        </p>
      </div>
    </>
  )
};

export default NumberConverter
