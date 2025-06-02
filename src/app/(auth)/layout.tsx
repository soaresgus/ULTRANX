import BigTitle from '@/components/BigTitle';
import WavyBackground from '@/components/WavyBackground';
import { italianaFont, jomhuriaFont } from '../layout';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${italianaFont.variable} ${jomhuriaFont.variable} antialiased`}>
        <WavyBackground className="flex min-h-screen items-center justify-center px-38 not-xl:flex-col">
          <BigTitle />

          <div className="center-slide" />

          <section className="font-jomhuria min-w-xl">{children}</section>
        </WavyBackground>
      </body>
    </html>
  );
}
