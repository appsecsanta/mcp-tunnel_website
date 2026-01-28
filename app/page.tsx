'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';

const TYPING_WORDS = ['MCP servers', 'tools', 'resources', 'prompts', 'localhost'];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'mac' | 'source'>('mac');
  const [copied, setCopied] = useState(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect
  useEffect(() => {
    const word = TYPING_WORDS[typingIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < word.length) {
          setDisplayText(word.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  const handleCopy = () => {
    const command = activeTab === 'mac'
      ? 'curl -L https://github.com/appsecsanta/mcp-tunnel/releases/latest/download/mcptunnel-$(uname -s | tr A-Z a-z)-$(uname -m) -o mcptunnel && chmod +x mcptunnel'
      : 'go install github.com/appsecsanta/mcptunnel@latest';
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Navigation - bun.sh style */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl' : ''
        }`}
        style={{
          background: isScrolled ? 'rgba(12, 12, 12, 0.8)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center" style={{ height: '72px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-orange)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-bg-primary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-xl" style={{ color: 'var(--color-text-primary)' }}>mcpTunnel</span>
            </Link>

            {/* Nav Links - bun.sh style with 2rem gap */}
            <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
              <a href="#features" className="nav-link">Features</a>
              <a href="#install" className="nav-link">Install</a>
              <a href="https://github.com/appsecsanta/mcp-tunnel" target="_blank" rel="noopener noreferrer" className="nav-link">Docs</a>
              <a
                href="https://github.com/appsecsanta/mcp-tunnel"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link flex items-center gap-1.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              {/* CTA Button */}
              <Link
                href="/login"
                className="font-medium px-4 py-2 rounded-full transition-opacity duration-150 hover:opacity-90"
                style={{
                  background: 'var(--color-orange)',
                  color: 'var(--color-bg-primary)'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up" style={{ color: 'var(--color-text-primary)' }}>
                Give AI access to your{' '}
                <span className="gradient-text">{displayText}</span>
                <span className="typing-cursor" />
              </h1>

              <p className="text-lg md:text-xl mb-8 animate-slide-up animate-delay-100" style={{ color: 'var(--color-text-secondary)' }}>
                Expose your local MCP servers to any AI client over the internet.
                One command, one URL, <strong style={{ color: 'var(--color-text-primary)' }}>all your tools</strong>.
              </p>

              {/* Install Box */}
              <div className="install-box mb-6 animate-slide-up animate-delay-200">
                <div className="tabs">
                  <button
                    onClick={() => setActiveTab('mac')}
                    className={`tab ${activeTab === 'mac' ? 'active' : ''}`}
                  >
                    Linux & macOS
                  </button>
                  <button
                    onClick={() => setActiveTab('source')}
                    className={`tab ${activeTab === 'source' ? 'active' : ''}`}
                  >
                    From Source
                  </button>
                </div>
                <div className="p-4 flex items-center justify-between gap-4">
                  <code className="font-mono text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>$</span>{' '}
                    {activeTab === 'mac' ? 'curl -L github.com/.../mcptunnel -o mcptunnel' : 'go install github.com/appsecsanta/mcptunnel@latest'}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg transition-all hover:bg-[var(--color-bg-hover)]"
                    style={{ color: copied ? 'var(--color-green)' : 'var(--color-text-muted)' }}
                  >
                    {copied ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Open Source Badge */}
              <div className="animate-slide-up animate-delay-400">
                <a
                  href="https://github.com/appsecsanta/mcp-tunnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                  style={{ background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Open Source &middot; MIT Licensed
                </a>
              </div>
            </div>

            {/* Right Side - Demo Terminal */}
            <div className="animate-slide-up animate-delay-200 hidden lg:block">
              <HeroDemoCard />
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Grid - bun.sh style */}
      <section className="py-16 border-y" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm font-medium tracking-wider mb-10" style={{ color: 'var(--color-text-muted)' }}>
            WORKS WITH YOUR FAVORITE AI
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <PlatformCard
              name="ChatGPT"
              icon={<ChatGPTIcon />}
              description="Web & Desktop"
            />
            <PlatformCard
              name="Claude"
              icon={<ClaudeIcon />}
              description="Desktop & Mobile"
            />
            <PlatformCard
              name="Claude Code"
              icon={<ClaudeCodeIcon />}
              description="CLI & IDE"
            />
            <PlatformCard
              name="Cursor"
              icon={<CursorIcon />}
              description="AI Code Editor"
            />
          </div>
        </div>
      </section>

      {/* 4-Column Toolkit Grid - bun.sh style */}
      <section className="section px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              One tunnel. Four superpowers.
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Everything you need to expose local MCP servers remotely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ToolkitCard
              title="Auto-Discovery"
              badge="Detect"
              color="cyan"
              features={[
                'Scans Claude Desktop, Cursor, and Continue configs',
                'Finds all your local MCP server definitions',
                'Custom servers via ~/.mcptunnel/servers.json',
                'Zero configuration required'
              ]}
              command="mcptunnel start --source claude"
            />
            <ToolkitCard
              title="Aggregation"
              badge="Combine"
              color="orange"
              features={[
                'Merges tools from multiple MCP servers',
                'Prefixed namespaces prevent collisions',
                'Unified resources and prompts',
                'Single endpoint for all servers'
              ]}
              command="server__toolName"
            />
            <ToolkitCard
              title="Secure Tunnel"
              badge="Connect"
              color="green"
              features={[
                'Cloudflare tunnel with OAuth authentication',
                'Works behind firewalls and NAT',
                'No port forwarding required',
                'Quick or named tunnel support'
              ]}
              command="mcptunnel start --quick-tunnel"
            />
            <ToolkitCard
              title="Credential Guard"
              badge="Protect"
              color="orange"
              features={[
                'Detects tokens, keys, and secrets in env vars',
                'Warns before exposing sensitive servers',
                'Safe-only mode skips risky servers',
                'Graceful process lifecycle management'
              ]}
              command="mcptunnel start --safe-only"
            />
          </div>
        </div>
      </section>

      {/* Framework Compatibility Grid */}
      <section className="py-16 px-4" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Works with any stack
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              mcpTunnel is language and framework agnostic
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <FrameworkBadge name="React" />
            <FrameworkBadge name="Next.js" />
            <FrameworkBadge name="Vue" />
            <FrameworkBadge name="Nuxt" />
            <FrameworkBadge name="Svelte" />
            <FrameworkBadge name="Node.js" />
            <FrameworkBadge name="Python" />
            <FrameworkBadge name="Go" />
            <FrameworkBadge name="Rust" />
            <FrameworkBadge name="Java" />
            <FrameworkBadge name="Ruby" />
            <FrameworkBadge name="PHP" />
            <FrameworkBadge name="Docker" />
            <FrameworkBadge name="K8s" />
            <FrameworkBadge name="AWS" />
            <FrameworkBadge name="GCP" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Built for developers who ship fast
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Stop copy-pasting between AI and your terminal. Let them talk directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<RocketIcon />}
              title="Zero Config"
              description="Auto-discovers MCP servers from your existing Claude Desktop, Cursor, and Continue configs. Just run mcptunnel start."
              color="cyan"
            />
            <FeatureCard
              icon={<ShieldIcon />}
              title="Secure by Default"
              description="Credential detection warns about exposed secrets. OAuth 2.0 authentication. Cloudflare tunnel encryption. --safe-only to skip risky servers."
              color="green"
            />
            <FeatureCard
              icon={<GlobeIcon />}
              title="Works Everywhere"
              description="Any MCP-compatible client: ChatGPT, Claude Desktop, Claude Code, Cursor, and more. One tunnel serves them all."
              color="orange"
            />
            <FeatureCard
              icon={<FolderIcon />}
              title="Multi-Server Aggregation"
              description="Combines tools, resources, and prompts from all your MCP servers into a single endpoint with prefixed namespaces."
              color="orange"
            />
            <FeatureCard
              icon={<TerminalIcon />}
              title="MCP Spec Compliant"
              description="Streamable HTTP transport implementing the MCP 2025-03-26 specification. JSON-RPC over HTTP with session management."
              color="purple"
            />
            <FeatureCard
              icon={<TargetIcon />}
              title="Graceful Lifecycle"
              description="Clean process spawning via stdio. SIGINT/SIGTERM handlers. Automatic child process cleanup. Cross-platform builds."
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section px-4" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Three steps. That's it.
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              From zero to remote MCP access in under a minute
            </p>
          </div>

          <div className="space-y-6">
            <StepCard
              number={1}
              title="Download from GitHub Releases"
              code="github.com/appsecsanta/mcp-tunnel/releases"
              isUrl
            />
            <StepCard
              number={2}
              title="Start — discovers and aggregates your MCP servers"
              code="mcptunnel start"
            />
            <StepCard
              number={3}
              title="Connect any MCP client to the tunnel URL"
              code="https://your-tunnel.trycloudflare.com/mcp"
              isUrl
            />
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="section px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              See it in action
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              One command discovers, aggregates, and tunnels your MCP servers
            </p>
          </div>

          <div className="code-block glow-cyan">
            <div className="space-y-3 font-mono text-sm">
              <div><span style={{ color: 'var(--color-text-muted)' }}>$</span> <span style={{ color: 'var(--color-text-primary)' }}>mcptunnel start</span></div>
              <div className="pt-2"><span style={{ color: 'var(--color-cyan)' }}>Discovering MCP servers...</span></div>
              <div><span style={{ color: 'var(--color-green)' }}>  ✓ claude:</span> <span style={{ color: 'var(--color-text-secondary)' }}>filesystem, git, postgres</span></div>
              <div><span style={{ color: 'var(--color-green)' }}>  ✓ cursor:</span> <span style={{ color: 'var(--color-text-secondary)' }}>typescript-tools</span></div>
              <div><span style={{ color: 'var(--color-orange)' }}>  ⚠ mcptunnel:</span> <span style={{ color: 'var(--color-text-secondary)' }}>docker-mcp (has credentials, use --safe-only to skip)</span></div>
              <div className="pt-2"><span style={{ color: 'var(--color-cyan)' }}>Aggregating 5 servers → 23 tools, 4 resources</span></div>
              <div><span style={{ color: 'var(--color-text-secondary)' }}>  filesystem__read_file, git__log, postgres__query, ...</span></div>
              <div className="pt-2"><span style={{ color: 'var(--color-cyan)' }}>HTTP server:</span> <span style={{ color: 'var(--color-text-secondary)' }}>http://127.0.0.1:3000/mcp</span></div>
              <div><span style={{ color: 'var(--color-green)' }}>Tunnel ready:</span> <span style={{ color: 'var(--color-cyan)' }}>https://abc123.trycloudflare.com/mcp</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - bun.sh style multi-column */}
      <footer className="py-16 px-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Resources</h3>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <li><a href="https://github.com/appsecsanta/mcp-tunnel" className="hover:text-[var(--color-text-primary)] transition">Documentation</a></li>
                <li><a href="https://github.com/appsecsanta/mcp-tunnel" className="hover:text-[var(--color-text-primary)] transition">GitHub</a></li>
                <li><a href="https://github.com/appsecsanta/mcp-tunnel/issues" className="hover:text-[var(--color-text-primary)] transition">Issues</a></li>
                <li><a href="https://github.com/appsecsanta/mcp-tunnel/releases" className="hover:text-[var(--color-text-primary)] transition">Changelog</a></li>
              </ul>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Product</h3>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <li><a href="#features" className="hover:text-[var(--color-text-primary)] transition">Features</a></li>
                <li><a href="#install" className="hover:text-[var(--color-text-primary)] transition">Install</a></li>
                <li><Link href="/login" className="hover:text-[var(--color-text-primary)] transition">Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-[var(--color-text-primary)] transition">Dashboard</Link></li>
              </ul>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Platforms</h3>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <li><span className="hover:text-[var(--color-text-primary)] transition">ChatGPT</span></li>
                <li><span className="hover:text-[var(--color-text-primary)] transition">Claude Desktop</span></li>
                <li><span className="hover:text-[var(--color-text-primary)] transition">Cursor</span></li>
                <li><span className="hover:text-[var(--color-text-primary)] transition">Any MCP Client</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Legal</h3>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <li><a href="https://github.com/appsecsanta/mcp-tunnel/blob/main/LICENSE" className="hover:text-[var(--color-text-primary)] transition">MIT License</a></li>
                <li><a href="/privacy" className="hover:text-[var(--color-text-primary)] transition">Privacy</a></li>
                <li><a href="/terms" className="hover:text-[var(--color-text-primary)] transition">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t gap-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-orange)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-bg-primary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>mcpTunnel</span>
            </div>

            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Open source, free forever
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Components

function FeatureCard({ icon, title, description, color }: { icon: ReactNode; title: string; description: string; color: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'var(--color-cyan)',
    orange: 'var(--color-orange)',
    green: 'var(--color-green)',
    purple: 'var(--color-purple)',
  };

  return (
    <div className="feature-card">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{ background: `${colorMap[color]}20`, color: colorMap[color] }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-secondary)' }}>{description}</p>
    </div>
  );
}

function StepCard({ number, title, code, isUrl }: { number: number; title: string; code: string; isUrl?: boolean }) {
  return (
    <div className="card flex items-center gap-6">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-lg flex-shrink-0"
        style={{ background: 'var(--color-cyan)', color: 'var(--color-bg-primary)' }}
      >
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
        <code className="font-mono text-sm" style={{ color: isUrl ? 'var(--color-cyan)' : 'var(--color-text-secondary)' }}>
          {code}
        </code>
      </div>
    </div>
  );
}

// Icons
function RocketIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Platform Grid Components
function PlatformCard({ name, icon, description }: { name: string; icon: ReactNode; description: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-200 hover:scale-105"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="w-12 h-12 mb-3 flex items-center justify-center" style={{ color: 'var(--color-text-primary)' }}>
        {icon}
      </div>
      <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>{name}</h3>
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
    </div>
  );
}

function ToolkitCard({ title, badge, color, features, command }: {
  title: string;
  badge: string;
  color: string;
  features: string[];
  command: string;
}) {
  const colorMap: Record<string, string> = {
    cyan: 'var(--color-cyan)',
    orange: 'var(--color-orange)',
    green: 'var(--color-green)',
  };

  return (
    <div
      className="p-6 rounded-xl transition-all duration-200"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
        <span
          className="px-3 py-1 text-xs font-medium rounded-full"
          style={{
            background: `${colorMap[color]}15`,
            color: colorMap[color],
            border: `1px solid ${colorMap[color]}30`
          }}
        >
          {badge}
        </span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colorMap[color] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div
        className="font-mono text-xs px-3 py-2 rounded-lg"
        style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-muted)' }}
      >
        {command}
      </div>
    </div>
  );
}

function FrameworkBadge({ name }: { name: string }) {
  return (
    <div
      className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)'
      }}
    >
      {name}
    </div>
  );
}

// Platform Icons
function ChatGPTIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" opacity="0.3"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <circle cx="8" cy="12" r="1.5"/>
      <circle cx="16" cy="12" r="1.5"/>
      <path d="M12 16c-1.48 0-2.75-.81-3.45-2h6.9c-.7 1.19-1.97 2-3.45 2z"/>
    </svg>
  );
}

function ClaudeCodeIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9l-3 3 3 3" />
      <path d="M15 9l3 3-3 3" />
    </svg>
  );
}

function MCPIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="12" cy="20" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="20" cy="12" r="2" />
      <line x1="12" y1="6" x2="12" y2="9" />
      <line x1="12" y1="15" x2="12" y2="18" />
      <line x1="6" y1="12" x2="9" y2="12" />
      <line x1="15" y1="12" x2="18" y2="12" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 8l4 8 1.5-3.5L17 11z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Hero Demo Card - bun.sh style right panel
function HeroDemoCard() {
  const [activeDemo, setActiveDemo] = useState<'files' | 'shell' | 'edit'>('files');

  const demos = {
    files: {
      title: 'Auto-discover servers',
      lines: [
        { type: 'prompt', text: '$ mcptunnel start' },
        { type: 'response', text: 'Discovering MCP servers...' },
        { type: 'success', text: '✓ claude: filesystem, git' },
        { type: 'success', text: '✓ cursor: typescript-tools' },
        { type: 'success', text: '✓ mcptunnel: postgres' },
        { type: 'output', text: '' },
        { type: 'response', text: 'Aggregated 3 servers → 12 tools' },
        { type: 'success', text: '✓ Listening on :3000' },
      ]
    },
    shell: {
      title: 'Tunnel to any AI',
      lines: [
        { type: 'prompt', text: '$ mcptunnel start --quick-tunnel' },
        { type: 'output', text: '' },
        { type: 'response', text: 'Creating Cloudflare tunnel...' },
        { type: 'success', text: '✓ Tunnel ready' },
        { type: 'output', text: '' },
        { type: 'diff-add', text: 'https://abc123.trycloudflare.com/mcp' },
        { type: 'output', text: '' },
        { type: 'response', text: 'Paste this URL in your AI client' },
      ]
    },
    edit: {
      title: 'Aggregated tools',
      lines: [
        { type: 'response', text: 'tools/list response:' },
        { type: 'output', text: '' },
        { type: 'diff-add', text: '  filesystem__read_file' },
        { type: 'diff-add', text: '  filesystem__write_file' },
        { type: 'diff-add', text: '  git__log' },
        { type: 'diff-add', text: '  git__diff' },
        { type: 'diff-add', text: '  postgres__query' },
        { type: 'success', text: '✓ 12 tools from 3 servers' },
      ]
    }
  };

  const currentDemo = demos[activeDemo];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)'
      }}
    >
      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
        <button
          onClick={() => setActiveDemo('files')}
          className={`px-5 py-3 text-sm font-medium transition-colors ${activeDemo === 'files' ? 'border-b-2' : ''}`}
          style={{
            color: activeDemo === 'files' ? 'var(--color-cyan)' : 'var(--color-text-muted)',
            borderColor: activeDemo === 'files' ? 'var(--color-cyan)' : 'transparent',
            marginBottom: activeDemo === 'files' ? '-1px' : '0'
          }}
        >
          Discover
        </button>
        <button
          onClick={() => setActiveDemo('shell')}
          className={`px-5 py-3 text-sm font-medium transition-colors ${activeDemo === 'shell' ? 'border-b-2' : ''}`}
          style={{
            color: activeDemo === 'shell' ? 'var(--color-orange)' : 'var(--color-text-muted)',
            borderColor: activeDemo === 'shell' ? 'var(--color-orange)' : 'transparent',
            marginBottom: activeDemo === 'shell' ? '-1px' : '0'
          }}
        >
          Tunnel
        </button>
        <button
          onClick={() => setActiveDemo('edit')}
          className={`px-5 py-3 text-sm font-medium transition-colors ${activeDemo === 'edit' ? 'border-b-2' : ''}`}
          style={{
            color: activeDemo === 'edit' ? 'var(--color-green)' : 'var(--color-text-muted)',
            borderColor: activeDemo === 'edit' ? 'var(--color-green)' : 'transparent',
            marginBottom: activeDemo === 'edit' ? '-1px' : '0'
          }}
        >
          Tools
        </button>
      </div>

      {/* Demo Content */}
      <div className="p-5">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
          {currentDemo.title}
        </h3>
        <div className="font-mono text-sm space-y-1.5">
          {currentDemo.lines.map((line, i) => (
            <div key={i} style={{
              color: line.type === 'prompt' ? 'var(--color-orange)' :
                     line.type === 'response' ? 'var(--color-cyan)' :
                     line.type === 'success' ? 'var(--color-green)' :
                     line.type === 'diff-add' ? 'var(--color-green)' :
                     line.type === 'diff-context' ? 'var(--color-text-secondary)' :
                     'var(--color-text-muted)'
            }}>
              {line.text || '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
