import { useState } from 'react';

const Demo = () => {
  const [value, setValue] = useState(0);
  console.log('value: ', value);
  return (
    <div>
      {value}

      <div
        onClick={() => {
          console.log('设置成1');
          setValue(1);
        }}
      >
        设置成1
      </div>
      <div
        onClick={() => {
          console.log('设置成2');
          setValue(2);
        }}
      >
        设置成2
      </div>
    </div>
  );
};

export default Demo;
