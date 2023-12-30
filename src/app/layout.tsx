import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../scss/styles.scss';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CyberNet',
  description: 'Cyberpunk 2077 social net "CyberNet"',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <div className="popover-container absolute"></div>
      </body>
    </html>
  );
}
