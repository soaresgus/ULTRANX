'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ForgotPasswordCodeForm from './ForgotPasswordCodeForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import api from '@/lib/axios';
import { toast } from 'sonner';

const ForgotPasswordFields: React.FC = () => {
  const [codeWasSent, setCodeWasSent] = useState(false);
  const [receivedCode, setReceivedCode] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter();

  async function resetPassword() {
    try {
      setIsLoading(true);
      setIsCodeVerified(true);

      await api.post('/auth/reset-password', {
        email,
        code: receivedCode,
        newPassword: password
      })

      setIsLoading(false);

      router.push('/');
      toast.success('Senha redefinida com sucesso!');
    } catch {
      setErrorMessage('Erro ao redefinir a senha. Tente novamente mais tarde.')
      throw new Error('Erro ao redefinir a senha. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  return codeWasSent && !isCodeVerified ? (
    <ForgotPasswordCodeForm
      onCodeSuccess={(code) => {
        setReceivedCode(code);
        setIsCodeVerified(true);
      }}
      onBack={() => setCodeWasSent((state) => !state)}
      email={email}
      isLoading={isLoading}
    />
  ) :
    isCodeVerified ? (
      <ResetPasswordForm
        onSubmit={resetPassword}
        onPasswordChange={(newPassword) => setPassword(newPassword)}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    ) : (
      <ForgotPasswordForm
        onEmailChange={(email) => setEmail(email)}
        onCodeSent={() => setCodeWasSent(true)}
      />
    )
};

export default ForgotPasswordFields;
