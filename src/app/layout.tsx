import type { Metadata } from 'next';
import { Italiana, Jomhuria } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

export const italianaFont = Italiana({
  variable: '--font-italiana',
  subsets: ['latin'],
  weight: '400',
});

export const jomhuriaFont = Jomhuria({
  variable: '--font-jomhuria',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'ULTRANX - Gestão completa',
  description: 'O CRM mais completo para o seu negócio',
  keywords: ['CRM', 'gestão de clientes', 'automação', 'negócios', 'ULTRANX'],
  authors: [{ name: 'Nemiq Studios' }],
  openGraph: {
    title: 'ULTRANX - O CRM mais completo para o seu negócio',
    description:
      'Transforme a gestão do seu negócio com o CRM mais avançado do mercado.',
    url: 'https://ultranx.com',
    type: 'website',
    images: [
      {
        url: 'https://assets.ultranx.com/logo.png',
        width: 800,
        height: 600,
        alt: 'Logotipo ULTRANX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ultranxcrm',
    title: 'ULTRANX - O CRM mais completo',
    description: 'Gerencie seu negócio de forma eficiente com nosso CRM.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${italianaFont.variable} ${jomhuriaFont.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
