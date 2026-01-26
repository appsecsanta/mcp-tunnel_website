import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MCPtunnel - Connect AI to Your Local Machine',
  description: 'Give ChatGPT and Claude access to your local files and terminal via MCP. Secure tunnel that works everywhere.',
  keywords: ['MCP', 'ChatGPT', 'Claude', 'AI', 'tunnel', 'local', 'filesystem', 'Model Context Protocol'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
