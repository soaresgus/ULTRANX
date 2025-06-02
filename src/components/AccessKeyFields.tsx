'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AccessButton from './AccessButtons';
import InputStyled from './Input';
import api from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { EyeSlashIcon, EyeIcon } from '@phosphor-icons/react';

type AccessKeyForm = { accessKey: string; password: string };

const AccessKeyFields: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccessKeyForm>();

  const [loginError, setLoginError] = useState<{
    active: boolean;
    message: string;
  }>({
    active: false,
    message: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function analyzeData(
    data: AccessKeyForm
  ): Promise<{ success: boolean; data?: unknown; error?: unknown }> {
    try {
      const response = await api.post('/auth/login', {
        email: data.accessKey,
        password: data.password,
      });

      if (response.status === 200) {
        setLoginError({ active: false, message: '' });
        return { success: true, data: response.data };
      } else {
        setLoginError({
          active: true,
          message: 'Erro ao fazer login. Verifique suas credenciais.',
        });
        return { success: false, error: response.data };
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setLoginError({
          active: true,
          // Se a API enviar uma mensagem específica dentro de response.data, exiba-a:
          message:
            typeof error.response.data === 'string'
              ? error.response.data
              : 'Credenciais inválidas ou usuário não encontrado.',
        });
        return { success: false, error: error.response.data };
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'request' in error
      ) {
        // A requisição foi feita, mas não houve resposta (servidor offline, CORS, timeout etc)
        setLoginError({
          active: true,
          message: 'Servidor não respondeu. Verifique a conexão.',
        });
        return {
          success: false,
          error: 'Servidor não respondeu. Verifique a conexão.',
        };
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error
      ) {
        // Algum outro erro inesperado (padrão do JavaScript ou do Axios sem response/request)
        setLoginError({
          active: true,
          message: (error as { message: string }).message,
        });
        return {
          success: false,
          error: (error as { message: string }).message,
        };
      } else {
        // Último caso: não conseguimos identificar o tipo
        setLoginError({
          active: true,
          message: 'Erro desconhecido. Tente novamente mais tarde.',
        });
        return { success: false, error: 'Erro desconhecido.' };
      }
    }
  }

  const router = useRouter();

  const onSubmit = async (data: AccessKeyForm) => {
    setLoginError({ active: false, message: '' });
    const result = await analyzeData(data);

    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full gap-4">
        <fieldset className="flex flex-col items-center justify-center w-full gap-2">
          <InputStyled
            {...register('accessKey', {
              required: 'O e-mail é obrigatório.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Insira um e-mail válido.',
              },
            })}
            type="text"
            placeholder="Exp.: fulano@mail.com"
          />
          {errors.accessKey && (
            <p className="text-3xl text-center text-red-500">
              {errors.accessKey.message}
            </p>
          )}
        </fieldset>

        <fieldset className="flex items-center justify-center w-full gap-2 bg-[var(--light-purple)] px-6 rounded-full focus-within:outline">
          <InputStyled
            {...register('password', {
              required: 'A senha é obrigatória.',
            })}
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
        </fieldset>

        {loginError.active && (
          <p className="text-3xl text-center text-red-500">
            {loginError.message}
          </p>
        )}

        <AccessButton />
      </form>
    </div>
  );
};

export default AccessKeyFields;
