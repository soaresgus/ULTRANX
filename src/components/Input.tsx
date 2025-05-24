import React from 'react';

const InputStyled: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      {...props}
      className="w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center opacity-100"
    />
  );
};

export default InputStyled;
