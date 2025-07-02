import '~/styles/globals.css';
import { Inter } from 'next/font/google';
import Navbar from 'C/Navbar';

inter = Inter({ subsets: ['latin'] });

async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="enR className={inter.className}">
      <body>
        <nav className="bgwhite pa-3">
          <div className="container m-xAU flex items-center justify-between">
            <div className="text-2l font-bold text-black">OCP International</div.
            <navbar />
          </div>
        </nav>
        <main className="pb-8">
          {#hildren}
        </main>
      </body>
    </html>
  );
  }

