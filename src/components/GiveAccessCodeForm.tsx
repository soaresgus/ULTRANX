import { ArrowCircleLeftIcon, SpinnerBallIcon } from '@phosphor-icons/react';
import Button from './Button';
import api from '@/lib/axios';
import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

interface GiveAccessCodeFormProps {
  onBack?: () => void;
  onCodeSuccess: () => void;
  email: string;
  isLoading?: boolean;
}

interface VerifyCodeResponse {
  success: boolean;
  message?: string;
}

interface VerifyCodeData {
  code: string;
  email: string;
}

async function verifyCode(data: VerifyCodeData): Promise<VerifyCodeResponse> {
  try {
    const request = await api.post('/auth/verify-code', {
      code: data.code,
      email: data.email,
    });

    return request.data;
  } catch (error: unknown) {
    console.error('Erro ao verificar o código:', error);

    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as AxiosError;
      throw new Error(
        `Erro ao verificar o código: ${
          (axiosError.response?.data as { message?: string })?.message ||
          'Tente novamente mais tarde.'
        }`
      );
    } else if (error && typeof error === 'object' && 'request' in error) {
      throw new Error(
        'Erro de conexão ao verificar o código. Verifique sua rede e tente novamente.'
      );
    } else {
      throw new Error(
        'Ocorreu um erro inesperado ao verificar o código. Tente novamente mais tarde.'
      );
    }
  }
}

const GiveAccessCodeForm: React.FC<GiveAccessCodeFormProps> = ({
  onBack,
  email,
  onCodeSuccess,
  isLoading = false,
}) => {
  const inputAmount = 6;
  const [codeValues, setCodeValues] = useState<string[]>(
    Array(inputAmount).fill('')
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  useEffect(() => {
    focusInput(0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (newValue && !/^[0-9]$/.test(newValue)) {
      return;
    }
    const newValues = [...codeValues];
    newValues[index] = newValue;
    setCodeValues(newValues);
    if (newValue && index < inputAmount - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !codeValues[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '');
    if (digits.length === inputAmount) {
      e.preventDefault();
      const newValues = digits.split('');
      setCodeValues(newValues);
      focusInput(inputAmount - 1);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setError(null);
    const code = codeValues.join('');
    try {
      const result = await verifyCode({ code, email });
      if (!result.success) {
        setError(result.message || 'Código inválido.');
      } else {
        console.log('Código verificado com sucesso!');
        onCodeSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <h3 className="text-6xl min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
          Insira o código que foi enviado ao seu e-mail.
        </h3>
        <h6 className="text-4xl min-w-[242px] font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
          Verifique a caixa de spam ou lixo eletrônico caso não tenha recebido o
          e-mail.
        </h6>
      </div>

      <div className="flex items-center justify-center gap-4">
        {Array.from({ length: inputAmount }, (_, index) => (
          <div
            key={index}
            className="group flex items-center justify-center w-16 h-16 border-2 border-indigo-600 rounded-lg bg-indigo-500/50 focus-within:bg-indigo-500/70 transition-all duration-200">
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={codeValues[index]}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onClick={() => focusInput(index)}
              className="flex pt-2 w-full h-full outline-0 text-center text-5xl bg-transparent text-white placeholder:text-white"
            />
          </div>
        ))}
      </div>
      {error && (
        <div className="text-red-500 text-center mt-4 text-3xl">{error}</div>
      )}
      <div className="flex gap-4 mt-8 w-full">
        <Button
          className="flex gap-2 items-center justify-center content-center text-center h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
          onClick={onBack}>
          <ArrowCircleLeftIcon size={32} />
          Voltar
        </Button>
        <Button
          className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center"
          onClick={handleVerify}
          disabled={isVerifying || codeValues.some((v) => v === '')}>
          {isLoading || isVerifying ? (
            <SpinnerBallIcon size={32} className="animate-spin" />
          ) : (
            'Verificar'
          )}
        </Button>
      </div>
    </div>
  );
};

export default GiveAccessCodeForm;
