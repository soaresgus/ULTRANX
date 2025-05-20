import React from 'react';

const AccessKeyFields: React.FC = () => (
  <div className="flex flex-col items-center justify-center w-full max-w-xl">
    <h3 className="text-[82px] min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
      Insira sua chave de acesso
    </h3>
    <input
      type="text"
      placeholder="Exp.: (email) ; (codigo)"
      className="w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center opacity-100"
    />
  </div>
);

export default AccessKeyFields;
