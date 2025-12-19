import type { Metadata } from 'next';
import { Geist, Geist_Mono, Figtree } from 'next/font/google';
import { Github, Linkedin, Heart } from 'lucide-react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Invoice Generator',
  description: 'Simple and clean invoice generator.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>

            <footer className="border-t py-6 md:py-8">
              <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center">
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
                  <a
                    href="https://www.linkedin.com/in/tomassalina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:underline"
                  >
                    Tomas Salina
                  </a>
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/tomassalina/invoice-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tomassalina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
