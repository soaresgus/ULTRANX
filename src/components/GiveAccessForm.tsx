'use client';

import { ArrowCircleLeftIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import Button from './Button';
import FirstAccessButton from './FirstAccessButton';
import InputStyled from './Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import z from 'zod';
import { useState } from 'react';

const giveAccessSchema = z.object({
  GiveAccess: z.string().email('Digite um e-mail válido'),
});

type GiveAccessForm = z.infer<typeof giveAccessSchema>;

interface FirstAccessResponse {
  success: boolean;
  message?: string;
}

async function sendFirstAccessCode(
  data: GiveAccessForm
): Promise<FirstAccessResponse> {
  try {
    const request = await api.post('/auth/send-verification', {
      email: data.GiveAccess,
    });

    if (request.status !== 200) {
      return {
        success: false,
        message:
          'Erro ao enviar o código de acesso. Tente novamente mais tarde.',
      };
    }

    return request.data;
  } catch {
    throw new Error(
      'Erro ao enviar o código de acesso. Tente novamente mais tarde.'
    );
  }
}

interface GiveAccessFormProps {
  onCodeSent?: () => void;
  onEmailChange: (email: string) => void;
}

const GiveAccessForm: React.FC<GiveAccessFormProps> = ({
  onCodeSent,
  onEmailChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GiveAccessForm>({
    resolver: zodResolver(giveAccessSchema),
  });

  const onSubmit = async (data: GiveAccessForm) => {
    setIsLoading(true);
    const response = await sendFirstAccessCode(data);

    if (response.success) {
      if (onCodeSent) onCodeSent();
    } else {
      console.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
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
            onChange={(e) => onEmailChange(e.target.value)}
            type="text"
            placeholder="Exp.: fulanoAlves@gmail.com"
          />
          {errors.GiveAccess && (
            <span className="text-3xl text-center text-red-500">
              {errors.GiveAccess.message}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={'/'}>
            <Button className="flex gap-2 items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center">
              <ArrowCircleLeftIcon size={32} />
              Voltar
            </Button>
          </Link>
          <FirstAccessButton type="submit" isLoading={isLoading} />
        </div>
      </form>
    </>
  );
};

export default GiveAccessForm;
