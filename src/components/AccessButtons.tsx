import React from 'react';
import Button from './Button';
import FirstAccessButton from './FirstAccessButton';

type AccessButtonsProps = {
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
};

const AccessButtons: React.FC<AccessButtonsProps> = ({ onSubmit }) => (
  <div className="flex gap-4 justify-between items-center w-full">
    <Button
      className="uppercase text-8xl mt-[2.8%] sign-in-text-shadow tracking-wider"
      type="submit"
      onClick={onSubmit}>
      ENTRAR
    </Button>
    <FirstAccessButton isRedirect type="button" />
  </div>
);

export default AccessButtons;
