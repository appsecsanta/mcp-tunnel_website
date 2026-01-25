import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LLMPair - Connect Claude to Your Local Machine',
  description: 'Give Claude access to your local files and terminal. Works with Claude Desktop, iPhone, and claude.ai/code.',
  keywords: ['Claude', 'AI', 'MCP', 'local', 'tunnel', 'filesystem'],
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
