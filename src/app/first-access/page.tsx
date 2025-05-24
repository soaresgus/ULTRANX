import BigTitle from '@/components/BigTitle';
import GiveAccessFields from '@/components/GiveAccessFields';
import WavyBackground from '@/components/WavyBackground';

export default function FirstAccess() {
  return (
    <main>
      <WavyBackground className="flex min-h-screen items-center justify-center gap-8">
        <BigTitle />

        <section className="font-jomhuria">
          <GiveAccessFields />
        </section>
      </WavyBackground>
    </main>
  );
}
