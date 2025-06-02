import React from 'react';
import Button from './Button';
import Link from 'next/link';
import { SpinnerBallIcon } from '@phosphor-icons/react';

interface FirstAccessButtonProps {
  onClick?: () => void;
  onSubmit?: () => void;
  type?: 'button' | 'submit';
  isRedirect?: boolean;
  isLoading?: boolean;
}

const FirstAccessButton: React.FC<FirstAccessButtonProps> = ({
  onClick,
  onSubmit,
  type,
  isRedirect = false,
  isLoading = false,
}: FirstAccessButtonProps) =>
  isRedirect && !isLoading ? (
    <Link href="/first-access">
      <Button
        className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={isLoading}
        type={type}>
        {isLoading ? (
          <SpinnerBallIcon size={32} className="animate-spin" />
        ) : (
          <span>Solicitar primeiro acesso</span>
        )}
      </Button>
    </Link>
  ) : (
    <Button
      onClick={onClick}
      onSubmit={onSubmit}
      className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
      disabled={isLoading}
      type={type}>
      {isLoading ? (
        <SpinnerBallIcon size={32} className="animate-spin" />
      ) : (
        <span>Solicitar primeiro acesso</span>
      )}
    </Button>
  );

export default FirstAccessButton;
