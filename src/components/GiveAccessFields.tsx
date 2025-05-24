'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputStyled from './Input';
import FirstAccessButton from './FirstAccessButton';

const giveAccessSchema = z.object({
  GiveAccess: z.string().email('Digite um e-mail válido'),
});

type GiveAccessForm = z.infer<typeof giveAccessSchema>;

async function saveGiveAccess(data: GiveAccessForm) {
  console.log('Recebido no servidor:', data);
}

const GiveAccessFields: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GiveAccessForm>({
    resolver: zodResolver(giveAccessSchema),
  });

  const onSubmit = async (data: GiveAccessForm) => {
    await saveGiveAccess(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl">
      <div className="flex flex-col items-center justify-center w-full max-w-xl mb-8">
        <h3 className="text-[82px] min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
          Digite seu e-mail
        </h3>
        <h6 className="text-2xl min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
          Este email será utilizado para enviar o código de acesso para seu
          acesso.
        </h6>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-2 mb-8">
          <InputStyled
            {...register('GiveAccess')}
            type="text"
            placeholder="Exp.: fulanoAlves@gmail.com"
          />
          {errors.GiveAccess && (
            <span className="text-3xl text-center text-red-500">
              {errors.GiveAccess.message}
            </span>
          )}
        </div>
        <FirstAccessButton type="submit" />
      </form>
    </div>
  );
};

export default GiveAccessFields;
