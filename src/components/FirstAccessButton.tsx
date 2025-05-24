import React from 'react';
import Button from './Button';
import Link from 'next/link';

interface FirstAccessButtonProps {
  onClick?: () => void;
  onSubmit?: () => void;
  type?: 'button' | 'submit';
  isRedirect?: boolean;
}

const FirstAccessButton: React.FC<FirstAccessButtonProps> = ({
  onClick,
  onSubmit,
  type,
  isRedirect = false,
}: FirstAccessButtonProps) =>
  isRedirect ? (
    <Link href="/first-access">
      <Button
        className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
        onClick={onClick}
        onSubmit={onSubmit}
        type={type}>
        Solicitar primeiro acesso
      </Button>
    </Link>
  ) : (
    <Button
      onClick={onClick}
      onSubmit={onSubmit}
      className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
      type={type}>
      Solicitar primeiro acesso
    </Button>
  );

export default FirstAccessButton;
