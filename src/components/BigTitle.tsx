import { italianaFont } from '@/app/layout';
import clsx from 'clsx';
import React from 'react';

interface BigTitleProps {
  className?: string;
}

const BigTitle: React.FC<BigTitleProps> = ({ className = '' }) => (
  <div
    className={clsx(
      'xl:grid sm:flex text-wrap grid-rows-3 row-span-3 items-center justify-center font-italiana',
      italianaFont.variable,
      className
    )}>
    <h1 className="text-[128px] text-center chroma-text open-close font-[var(--font-italiana)]">
      ULT
    </h1>
    <h2 className="text-[128px] text-center chroma-text open-close font-[var(--font-italiana)]">
      RA
    </h2>
    <h3 className="text-[128px] text-center open-close font-[var(--font-italiana)]">
      NX
    </h3>
  </div>
);

export default BigTitle;
