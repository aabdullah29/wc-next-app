// components/RadioButton.tsx

import React, { ChangeEvent } from 'react';

interface RadioButtonProps {
  label: string;
  value: any;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
  return (
    <div>
      <input
        type="radio"
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default RadioButton;
