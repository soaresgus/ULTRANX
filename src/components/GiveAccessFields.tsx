'use client';

import React, { useState } from 'react';
import GiveAccessForm from './GiveAccessForm';
import GiveAccessCodeForm from './GiveAccessCodeForm';

const GiveAccessFields: React.FC = () => {
  const [codeWasSent, setCodeWasSent] = useState(false);
  const [email, setEmail] = useState('');

  return codeWasSent ? (
    <GiveAccessCodeForm
      onCodeSuccess={() => console.log('Por aqui tudo bem =D')}
      onBack={() => setCodeWasSent((state) => !state)}
      email={email}
    />
  ) : (
    <GiveAccessForm
      onEmailChange={(email) => setEmail(email)}
      onCodeSent={() => setCodeWasSent(true)}
    />
  );
};

export default GiveAccessFields;
