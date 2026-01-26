'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚇</span>
              <span className="font-bold text-xl">MCPtunnel</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/appsecsanta/mcp-tunnel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                GitHub
              </a>
              <a
                href="#install"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🔌</span> MCP (Model Context Protocol) Server
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Connect AI to Your Local Machine
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Give ChatGPT and Claude access to your files and terminal.
            One command to install, works from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#install"
              className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-500/25"
            >
              Install Now
            </a>
            <a
              href="#how-it-works"
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-12 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Works with</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-2xl">🤖</span> ChatGPT
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-2xl">🧠</span> Claude Desktop
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-2xl">📱</span> Claude iOS
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              <span className="text-2xl">💻</span> Claude Code
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Why MCPtunnel?
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            The easiest way to give AI access to your local machine
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🚀"
              title="One Command Setup"
              description="Install and start in seconds. No Cloudflare account, no complex configuration. Just works."
            />
            <FeatureCard
              icon="🔒"
              title="Secure by Default"
              description="OAuth authentication, encrypted tunnels, and permission controls. Your data stays private."
            />
            <FeatureCard
              icon="🌍"
              title="Access Anywhere"
              description="Works from ChatGPT web, Claude Desktop, or your phone. Same tunnel, all platforms."
            />
            <FeatureCard
              icon="📁"
              title="File Operations"
              description="Read, write, and edit files. AI can help with code, docs, and file management."
            />
            <FeatureCard
              icon="💻"
              title="Shell Access"
              description="Run commands, scripts, and tools. Full terminal power with safety controls."
            />
            <FeatureCard
              icon="🎯"
              title="Smart Permissions"
              description="Choose what AI can access. Approve commands before execution, or enable YOLO mode."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <Step
              number={1}
              title="Install MCPtunnel"
              description="One command to install the CLI tool."
              code="brew install appsecsanta/tap/mcptunnel"
            />
            <Step
              number={2}
              title="Start the Tunnel"
              description="Launch the local server and establish the tunnel."
              code="mcptunnel start"
            />
            <Step
              number={3}
              title="Connect Your AI"
              description="Add the MCP server URL to ChatGPT or Claude."
              code="https://mcptunnel.sh/mcp"
            />
            <Step
              number={4}
              title="Start Using"
              description='Ask AI to work with your files: "List my project files" or "Run the tests"'
            />
          </div>
        </div>
      </section>

      {/* Install Section */}
      <section id="install" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-8">
            Install MCPtunnel with Homebrew:
          </p>
          <div className="bg-gray-800 rounded-xl p-6 mb-4 max-w-xl mx-auto">
            <code className="text-lg text-primary-400">
              brew install appsecsanta/tap/mcptunnel
            </code>
          </div>
          <p className="text-gray-500 text-sm mb-8">
            Or download directly from{' '}
            <a href="https://github.com/appsecsanta/mcp-tunnel/releases" className="text-primary-400 hover:underline">
              GitHub Releases
            </a>
          </p>
          <div className="bg-gray-800/50 rounded-xl p-6 max-w-xl mx-auto text-left">
            <p className="text-gray-400 text-sm mb-3">Then start the tunnel:</p>
            <code className="text-primary-400">mcptunnel start</code>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Architecture
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
            Secure connection from AI to your machine
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 font-mono text-sm">
            <pre className="text-center text-gray-700 dark:text-gray-300 overflow-x-auto">
{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ChatGPT /     │     │   MCPtunnel     │     │   Your Local    │
│   Claude        │────▶│   Cloud         │────▶│   Machine       │
│   (anywhere)    │     │   (Cloudflare)  │     │   (mcptunnel)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                        OAuth + MCP
                        Protocol`}
            </pre>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🔐</div>
              <h4 className="font-semibold mb-1">OAuth Authentication</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure login via ChatGPT/Claude</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🌐</div>
              <h4 className="font-semibold mb-1">Cloudflare Tunnel</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Encrypted connection, no port forwarding</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="font-semibold mb-1">Local Control</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">You control what AI can access</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Using AI with Your Local Files
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            MCPtunnel is open source and free to use. Get started in under a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#install"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transition"
            >
              Install MCPtunnel
            </a>
            <a
              href="https://github.com/appsecsanta/mcp-tunnel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-800 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚇</span>
              <span className="font-bold">MCPtunnel</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="https://github.com/appsecsanta/mcp-tunnel" className="hover:text-gray-900 dark:hover:text-white">GitHub</a>
              <a href="https://github.com/appsecsanta/mcp-tunnel/issues" className="hover:text-gray-900 dark:hover:text-white">Issues</a>
              <a href="https://github.com/appsecsanta/mcp-tunnel/blob/main/LICENSE" className="hover:text-gray-900 dark:hover:text-white">License</a>
            </div>
            <p className="text-sm text-gray-500">
              Open source under MIT License
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  code,
}: {
  number: number;
  title: string;
  description: string;
  code?: string;
}) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
        {code && (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
            {code}
          </div>
        )}
      </div>
    </div>
  );
}
