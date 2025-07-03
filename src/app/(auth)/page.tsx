import AccessKeyFields from '@/components/AccessKeyFields';
import Button from '@/components/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h3 className="text-[82px] min-w-[242px] max-w-xl font-normal text-center font-jomhuria tracking-wider leading-none wrap-break-word">
        Insira seu endereço de e-mail e senha
      </h3>
      <AccessKeyFields />
      <Link href={'/forgot-password'}>
        <Button className="flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center">
          Esqueci minha senha
        </Button>
      </Link>
    </main>
  );
}
