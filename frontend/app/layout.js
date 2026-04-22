import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from './Providers';

export const metadata = {
  title: 'LUXE — Luxury E-commerce',
  description: 'Premium products, secure payments, and fast delivery worldwide.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased" style={{ backgroundColor: '#0d0d0d', color: '#f0f0f0' }}>
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
