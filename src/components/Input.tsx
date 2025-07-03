import React from 'react';

interface InputStyledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customClassName?: string;
}

const defaultClassName =
  'w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center opacity-100';

const InputStyled: React.FC<InputStyledProps> = ({
  customClassName,
  className,
  ...rest
}) => {
  // Mescla customClassName e className, priorizando customClassName se fornecido
  const mergedClassName = customClassName || className || defaultClassName;

  return <input {...rest} className={mergedClassName} />;
};

export default InputStyled;
