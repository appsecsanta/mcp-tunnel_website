import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'mcpTunnel - Connect AI to Your Local Machine',
  description: 'Give ChatGPT and Claude access to your local files and terminal via MCP. Secure tunnel that works everywhere.',
  keywords: ['MCP', 'ChatGPT', 'Claude', 'AI', 'tunnel', 'local', 'filesystem', 'Model Context Protocol'],
  openGraph: {
    title: 'mcpTunnel - Connect AI to Your Local Machine',
    description: 'Give ChatGPT and Claude access to your local files and terminal via MCP.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
