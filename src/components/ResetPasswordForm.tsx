'use client';

import {
  ArrowCircleLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  SpinnerBallIcon,
} from '@phosphor-icons/react';
import Link from 'next/link';
import Button from './Button';
import InputStyled from './Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useState } from 'react';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onSubmit: () => void;
  onPasswordChange: (newPassword: string) => void;
  errorMessage?: string;
  isLoading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSubmit,
  onPasswordChange,
  errorMessage,
  isLoading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { onChange: onNewPasswordChangeRHF, ...newPasswordFieldProps } = register('newPassword');
  const { onChange: onConfirmPasswordChangeRHF, ...confirmPasswordProps } = register('confirmPassword');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
        <h3 className="text-[82px] min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
          Digite sua nova senha
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-8">
          <fieldset className="flex flex-col w-full">
            <span className="text-5xl text-center">Nova senha</span>
            <div className="flex items-center justify-center w-full gap-2 bg-[var(--light-purple)] px-6 rounded-full focus-within:outline">
              <InputStyled
                {...newPasswordFieldProps}
                onChange={(e) => {
                  onPasswordChange(e.target.value);
                  onNewPasswordChangeRHF(e); // atualiza o estado do RHF
                }}
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Digite sua nova senha"
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
              {errors.newPassword && (
                <span className="text-3xl text-center text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </fieldset>

          <fieldset className="flex flex-col w-full">
            <span className="text-5xl text-center">Confirme sua senha</span>
            <div className="flex items-center justify-center w-full gap-2 bg-[var(--light-purple)] px-6 rounded-full focus-within:outline">
              <InputStyled
                {...confirmPasswordProps}
                onChange={(e) => {
                  onConfirmPasswordChangeRHF(e); // atualiza o estado do RHF
                }}
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                customClassName="w-full h-[44px] placeholder:text-gray-300 text-[40px] tracking-wider font-thin placeholder:text-center opacity-100 outline-none"
              />
              <button
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                type="button"
                className="cursor-pointer">
                {isConfirmPasswordVisible ? (
                  <EyeIcon size={24} />
                ) : (
                  <EyeSlashIcon size={24} />
                )}
              </button>
            </div>

            <div className="flex items-center justify-center w-full mt-2">
              {errors.confirmPassword && (
                <span className="text-3xl text-center text-red-500">
                  {errors.confirmPassword.message}
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
          <Button
            className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
            disabled={isLoading}
            type="submit">
            {isLoading ? (
              <SpinnerBallIcon size={32} className="animate-spin" />
            ) : (
              <span>Redefinir senha</span>
            )}
          </Button>
        </div>

        {errorMessage && (
          <span className="text-5xl text-center text-red-500 mt-4">
            {errorMessage}
          </span>
        )}
      </form>
    </>
  );
};

export default ResetPasswordForm;
