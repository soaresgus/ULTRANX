'use client';

import {
  ArrowCircleLeftIcon,
  SpinnerBallIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import Button from './Button';
import InputStyled from './Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import z from 'zod';
import { useState } from 'react';
import { AxiosError } from 'axios';

const forgotPasswordSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
}

async function sendForgotPasswordCode(
  data: ForgotPasswordForm
): Promise<ForgotPasswordResponse> {
  try {
    const request = await api.post('/auth/forgot-password', {
      email: data.email,
    });

    if (request.status !== 200) {
      return {
        success: false,
        message:
          request.data.message ||
          'Erro ao enviar o código de acesso. Tente novamente mais tarde.',
      };
    }

    return request.data;
  } catch (error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.status === 400 && error.response?.data?.message
            ? error.response.data.message
            : 'Erro ao enviar o código de acesso. Tente novamente mais tarde.',
      };
    }
    return {
      success: false,
      message: 'Erro ao enviar o código de acesso. Tente novamente mais tarde.',
    };
  }
}

interface ForgotPasswordFormProps {
  onCodeSent: () => void;
  onEmailChange: (email: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onCodeSent,
  onEmailChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { onChange: onEmailChangeRHF, ...emailFieldProps } = register('email');

  const onSubmit = async (data: ForgotPasswordForm) => {
    // Limpa qualquer erro global anterior
    setGlobalError(null);
    setIsLoading(true);

    try {
      const response = await sendForgotPasswordCode(data);

      if (!response.success) {
        setGlobalError(response.message || 'Ocorreu um erro inesperado.');
        return;
      }

      onCodeSent();
    } catch (error: unknown) {
      setGlobalError(
        error instanceof Error && error.message
          ? error.message
          : 'Erro ao processar a solicitação. Tente novamente mais tarde.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
        <h3 className="text-[82px] min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
          Digite seu e-mail
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-8">
          <fieldset className="flex flex-col gap-2 mb-8">
            <span className="text-5xl text-center">E-mail</span>
            <InputStyled
              {...emailFieldProps}
              onChange={(e) => {
                onEmailChangeRHF(e); // atualiza o estado do RHF
                onEmailChange(e.target.value); // seu código customizado
              }}
              type="text"
              placeholder="Exp.: fulanoAlves@mail.com"
            />
            {errors.email && (
              <span className="text-3xl text-center text-red-500">
                {errors.email.message}
              </span>
            )}
          </fieldset>
        </div>

        <div className="flex gap-2">
          <Link href={'/'}>
            <Button className="flex gap-2 items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center">
              <ArrowCircleLeftIcon size={32} />
              Voltar
            </Button>
          </Link>
          <Button
            className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
            disabled={isLoading}
            type="submit">
            {isLoading ? (
              <SpinnerBallIcon size={32} className="animate-spin" />
            ) : (
              <span>Solicitar redefinição de senha</span>
            )}
          </Button>
        </div>

        {globalError && (
          <span className="text-5xl text-center text-red-500 mt-4">
            {globalError}
          </span>
        )}
      </form>
    </>
  );
};

export default ForgotPasswordForm;
