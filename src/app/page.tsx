import AccessKeyFields from '@/components/AccessKeyFields';
import BigTitle from '@/components/BigTitle';
import Button from '@/components/Button';
import WavyBackground from '@/components/WavyBackground';

export default function Home() {
  return (
    <main>
      <WavyBackground className="flex min-h-screen items-center justify-center px-38">
        <BigTitle />

        <div className="center-slide" />

        <section className="font-jomhuria">
          <AccessKeyFields />

          <div className="flex justify-center items-center w-full">
            <Button className="uppercase text-8xl mt-[2.8%] ">ENTRAR</Button>
            <Button className="ml-12 flex items-center justify-center content-center text-center w-full h-[44px] bg-[var(--light-purple)] px-6 py-2 placeholder:text-gray-300 text-[40px] tracking-wider font-thin rounded-full placeholder:text-center">
              Solicitar primeiro acesso
            </Button>
          </div>
        </section>
      </WavyBackground>
    </main>
  );
}
