'use client';

import {
  ArrowCircleLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import Button from './Button';
import FirstAccessButton from './FirstAccessButton';
import InputStyled from './Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import api from '@/lib/axios';
import z from 'zod';
import { useState } from 'react';
import { AxiosError } from 'axios';

const giveAccessSchema = z.object({
  email: z.string().email('Digite um e-mail válido'),
  firstName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  surname: z.string().min(3, 'O sobrenome deve ter pelo menos 3 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
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

interface GiveAccessFormProps {
  onCodeSent: () => void;
  onEmailChange: (email: string) => void;
  onFirstNameChange: (firstName: string) => void;
  onSurnameChange: (surname: string) => void;
  onPasswordChange: (password: string) => void;
}

const GiveAccessForm: React.FC<GiveAccessFormProps> = ({
  onCodeSent,
  onEmailChange,
  onFirstNameChange,
  onSurnameChange,
  onPasswordChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<GiveAccessForm>({
    resolver: zodResolver(giveAccessSchema),
  });

  const { onChange: onEmailChangeRHF, ...emailFieldProps } = register('email');
  const { onChange: onFirstNameChangeRHF, ...firstNameFieldProps } =
    register('firstName');
  const { onChange: onSurnameChangeRHF, ...surnameFieldProps } =
    register('surname');
  const { onChange: onPasswordChangeRHF, ...passwordFieldProps } =
    register('password');

  const verifyUserExists = async (email: string) => {
    try {
      const response = await api.post('/auth/user-exists', { email });
      return response.data.exists;
    } catch {
      setGlobalError(
        'Erro ao verificar se o usuário existe. Tente novamente mais tarde.'
      );
      throw new Error(
        'Erro ao verificar se o usuário existe. Tente novamente mais tarde.'
      );
    }
  };

  const onSubmit = async (data: GiveAccessForm) => {
    // Limpa qualquer erro global anterior
    setGlobalError(null);
    setIsLoading(true);

    try {
      const userExists = await verifyUserExists(data.email);

      if (userExists) {
        setError('email', {
          type: 'manual',
          message: 'Já existe uma conta com este e-mail.',
        });
        return;
      }

      const response = await sendFirstAccessCode(data);

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
          Digite seus dados
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

          <fieldset className="flex flex-col gap-2 mb-8">
            <span className="text-5xl text-center">Primeiro nome</span>
            <InputStyled
              {...firstNameFieldProps}
              onChange={(e) => {
                onFirstNameChangeRHF(e); // atualiza o estado do RHF
                onFirstNameChange(e.target.value); // seu código customizado
              }}
              type="text"
              placeholder="Exp.: Fulano"
            />
            {errors.firstName && (
              <span className="text-3xl text-center text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </fieldset>

          <fieldset className="flex flex-col gap-2 mb-8">
            <span className="text-5xl text-center">Sobrenome</span>
            <InputStyled
              {...surnameFieldProps}
              onChange={(e) => {
                onSurnameChangeRHF(e); // atualiza o estado do RHF
                onSurnameChange(e.target.value); // seu código customizado
              }}
              type="text"
              placeholder="Exp.: Alves"
            />
            {errors.surname && (
              <span className="text-3xl text-center text-red-500">
                {errors.surname.message}
              </span>
            )}
          </fieldset>

          <fieldset className="flex flex-col w-full">
            <span className="text-5xl text-center">Senha</span>
            <div className="flex items-center justify-center w-full gap-2 bg-[var(--light-purple)] px-6 rounded-full focus-within:outline">
              <InputStyled
                {...passwordFieldProps}
                onChange={(e) => {
                  onPasswordChangeRHF(e); // atualiza o estado do RHF
                  onPasswordChange(e.target.value); // seu código customizado
                }}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Digite sua senha"
                customClassName="w-full h-[44px] placeholder:text-gray-300 text-[40px] tracking-wider font-thin placeholder:text-center opacity-100 outline-none"
              />
              <button
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                type="button"
                className="cursor-pointer">
                {isPasswordVisible ? (
                  <EyeIcon size={24} />
                ) : (
                  <EyeSlashIcon size={24} />
                )}
              </button>
            </div>

            <div className="flex items-center justify-center w-full mt-2">
              {errors.password && (
                <span className="text-3xl text-center text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </fieldset>
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

        {globalError && (
          <span className="text-5xl text-center text-red-500 mt-4">
            {globalError}
          </span>
        )}
      </form>
    </>
  );
};

export default GiveAccessForm;
