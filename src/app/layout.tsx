import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeepSeek Code Formatter - AI-Powered Code Beautifier',
  description: 'Modern AI-powered code formatter using DeepSeek. Format, optimize, and beautify your code with beautiful card-based UI.',
  keywords: ['code formatter', 'AI formatter', 'DeepSeek', 'code beautifier', 'code refactoring'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="minimal"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
