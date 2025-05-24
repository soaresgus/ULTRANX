'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import AccessButton from './AccessButtons';
import InputStyled from './Input';

async function saveAccessKey(data: { accessKey: string }) {
  console.log('Recebido no servidor:', data);
}

type AccessKeyForm = { accessKey: string };

const AccessKeyFields: React.FC = () => {
  const { register, handleSubmit } = useForm<AccessKeyForm>();

  const onSubmit = async (data: { accessKey: string }) => {
    await saveAccessKey(data); // Envia os dados para o servidor
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl">
      <h3 className="text-[82px] min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
        Insira sua chave de acesso
      </h3>
      <form>
        <InputStyled
          {...register('accessKey')}
          type="text"
          placeholder="Exp.: (email) ; (codigo)"
        />

        <AccessButton onSubmit={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default AccessKeyFields;
