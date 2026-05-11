import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Lama Buyer - Marketplace de Ropa Usada',
  description: 'Compra ropa usada y vintage en nuestro marketplace',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className="bg-lama-light text-lama-dark">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
