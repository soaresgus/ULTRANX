import Image from 'next/image';
import React from 'react';
import logo from '../../public/logoNemiqS.svg';
import Link from 'next/link';

const Watermark: React.FC = ({}) => {
  return (
    <div className="absolute bottom-0 right-0 flex items-center gap-2 p-2 order-[99999]">
      <Link href={'https://discord.skyblockbrasil.com.br'}>
        <div className="flex items-center justify-center mb-2 text-shadow-purple">
          <Image
            src={logo}
            className="w-12 h-12 rounded-full"
            alt={'Creators (NemiqStudios) logo'}
          />
        </div>

        <span className="text-3xl font-jomhuria">
          A product by <span className="text-[#D5CFFF]">NemiqStudios</span>
        </span>
      </Link>
    </div>
  );
};

export default Watermark;
