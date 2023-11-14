// components/MyButton.tsx

import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: String;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  console.log('button')
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
