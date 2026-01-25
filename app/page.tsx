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
              <span className="text-2xl">🔗</span>
              <span className="font-bold text-xl">LLMPair</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Connect Claude to Your Local Machine
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Give Claude access to your local files and terminal.
            Works with Claude Desktop, iPhone, and claude.ai/code.
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why LLMPair?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="📁"
              title="File Access"
              description="Let Claude read and write files on your machine. Perfect for coding, documentation, and file management."
            />
            <FeatureCard
              icon="💻"
              title="Terminal Access"
              description="Run commands, manage packages, and execute scripts. Claude becomes your command-line assistant."
            />
            <FeatureCard
              icon="🔒"
              title="Secure & Private"
              description="Your data never touches our servers. Direct encrypted tunnel between Claude and your machine."
            />
            <FeatureCard
              icon="📱"
              title="Works Everywhere"
              description="Claude Desktop, iPhone app, and claude.ai/code. One setup, all platforms."
            />
            <FeatureCard
              icon="⚡"
              title="Zero Config"
              description="Install, login, start. No Cloudflare account needed. We handle everything."
            />
            <FeatureCard
              icon="🎯"
              title="Precise Control"
              description="Choose which directories Claude can access. Block dangerous commands automatically."
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
              title="Install LLMPair"
              description="One command to install. Takes less than a minute."
              code="curl -L get.llmpair.io | sh"
            />
            <Step
              number={2}
              title="Login & Start"
              description="Get your permanent tunnel URL."
              code="llmpair login && llmpair start"
            />
            <Step
              number={3}
              title="Add to Claude"
              description="Open Claude Desktop Settings → MCP Servers → Add Remote MCP with your URL."
            />
            <Step
              number={4}
              title="Start Using"
              description='Ask Claude: "List the files in my Projects folder" or "Run npm install in my project"'
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
            Install LLMPair with a single command:
          </p>
          <div className="bg-gray-800 rounded-xl p-6 mb-8 max-w-xl mx-auto">
            <code className="text-lg text-primary-400">
              curl -L get.llmpair.io | sh
            </code>
          </div>
          <p className="text-gray-500 text-sm">
            Works on macOS and Linux. Windows support coming soon.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PricingCard
              name="Free"
              price="$0"
              description="Perfect for getting started"
              features={[
                '100 requests per day',
                '1 tunnel',
                'File read/write access',
                'Shell commands',
                'Community support',
              ]}
              cta="Get Started"
              ctaLink="/login"
            />
            <PricingCard
              name="Pro"
              price="$9.99"
              period="/month"
              description="For power users"
              features={[
                'Unlimited requests',
                'Custom subdomain',
                'Priority tunnel',
                'Advanced shell tools',
                'Email support',
              ]}
              cta="Upgrade to Pro"
              ctaLink="/login?plan=pro"
              highlighted
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔗</span>
              <span className="font-bold">LLMPair</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="/docs" className="hover:text-gray-900 dark:hover:text-white">Docs</a>
              <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white">Privacy</a>
              <a href="/terms" className="hover:text-gray-900 dark:hover:text-white">Terms</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">GitHub</a>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 LLMPair. All rights reserved.
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

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  highlighted,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`p-8 rounded-2xl border-2 ${
        highlighted
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {period && <span className="text-gray-500">{period}</span>}
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaLink}
        className={`block w-full py-3 rounded-lg text-center font-semibold transition ${
          highlighted
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
