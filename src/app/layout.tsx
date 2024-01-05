import type { Metadata } from 'next';
import { Slide, ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google';
import Providers from './providers';
import './globals.css';
import '../scss/styles.scss';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer
          transition={Slide}
          position="bottom-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
