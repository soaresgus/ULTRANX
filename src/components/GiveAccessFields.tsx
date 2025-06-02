'use client';

import React, { useState } from 'react';
import GiveAccessForm from './GiveAccessForm';
import GiveAccessCodeForm from './GiveAccessCodeForm';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

const GiveAccessFields: React.FC = () => {
  const [codeWasSent, setCodeWasSent] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function createAccount() {
    try {
      setIsLoading(true);

      await api.post('/auth/register', {
        email,
        firstName,
        surname,
        password,
      });

      router.push('/');
    } catch {
      throw new Error('Erro ao criar a conta. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }

  return codeWasSent ? (
    <GiveAccessCodeForm
      onCodeSuccess={() => createAccount()}
      onBack={() => setCodeWasSent((state) => !state)}
      email={email}
      isLoading={isLoading}
    />
  ) : (
    <GiveAccessForm
      onEmailChange={(email) => setEmail(email)}
      onFirstNameChange={(firstName) => setFirstName(firstName)}
      onSurnameChange={(surname) => setSurname(surname)}
      onPasswordChange={(password) => setPassword(password)}
      onCodeSent={() => setCodeWasSent(true)}
    />
  );
};

export default GiveAccessFields;
