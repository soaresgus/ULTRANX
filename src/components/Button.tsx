import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`${
        props.className ?? ''
      } hover:cursor-pointer leading-none text-center flex items-center justify-center`}
      type={props.type || 'button'}>
      {children}
    </button>
  );
};

export default Button;
