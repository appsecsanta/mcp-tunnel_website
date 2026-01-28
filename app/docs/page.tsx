'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';

// Documentation sections
const sections = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'installation', title: 'Installation' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'auto-discovery', title: 'Auto-Discovery' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'cli-reference', title: 'CLI Reference' },
  { id: 'tunneling', title: 'Tunneling' },
  { id: 'aggregation', title: 'Tool Aggregation' },
  { id: 'security', title: 'Security' },
  { id: 'platform-setup', title: 'Platform Setup' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

export default function DocsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].el;
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Navigation */}
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
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-orange)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-bg-primary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-xl" style={{ color: 'var(--color-text-primary)' }}>mcpTunnel</span>
            </Link>

            <div className="hidden md:flex items-center" style={{ gap: '2rem' }}>
              <a href="/#features" className="nav-link">Features</a>
              <a href="/#install" className="nav-link">Install</a>
              <Link href="/docs" className="nav-link" style={{ color: 'var(--color-orange)' }}>Docs</Link>
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
              <Link
                href="/login"
                className="font-medium px-4 py-2 rounded-full transition-opacity duration-150 hover:opacity-90"
                style={{ background: 'var(--color-orange)', color: 'var(--color-bg-primary)' }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-28">
        <div className="flex gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <h4 className="text-xs font-semibold tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                ON THIS PAGE
              </h4>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block py-1.5 text-sm transition-colors duration-150"
                    style={{
                      color: activeSection === section.id ? 'var(--color-orange)' : 'var(--color-text-muted)',
                      borderLeft: activeSection === section.id ? '2px solid var(--color-orange)' : '2px solid transparent',
                      paddingLeft: '12px',
                    }}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                <a
                  href="https://github.com/appsecsanta/mcp-tunnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-text-primary)]"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Edit on GitHub
                </a>
              </div>
            </div>
          </aside>

          {/* Documentation Content */}
          <main className="flex-1 min-w-0 pb-24">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge-cyan badge">Documentation</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                mcpTunnel Docs
              </h1>
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                Expose your local MCP servers to any AI client over the internet. One command, one URL, all your tools.
              </p>
            </div>

            {/* Getting Started */}
            <DocSection id="getting-started" title="Getting Started">
              <p>
                mcpTunnel discovers your locally configured MCP servers, aggregates their tools into a single endpoint, and tunnels it to the internet via Cloudflare. Any MCP-compatible AI client — ChatGPT, Claude, Cursor, and more — can then access your local tools remotely.
              </p>
              <InfoBox color="cyan">
                mcpTunnel is open source and free to use. It requires no account to get started with quick tunnels.
              </InfoBox>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <QuickLinkCard
                  title="Install"
                  description="Download the binary or build from source"
                  href="#installation"
                  color="cyan"
                />
                <QuickLinkCard
                  title="Quick Start"
                  description="Get running in under a minute"
                  href="#quick-start"
                  color="orange"
                />
                <QuickLinkCard
                  title="Platforms"
                  description="Setup guides for each AI client"
                  href="#platform-setup"
                  color="green"
                />
              </div>
            </DocSection>

            {/* Installation */}
            <DocSection id="installation" title="Installation">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                Pre-built Binaries
              </h3>
              <p>Download the latest release for your platform from GitHub Releases:</p>
              <CodeBlock
                id="install-curl"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`# Linux & macOS — auto-detect platform
curl -L https://github.com/appsecsanta/mcp-tunnel/releases/latest/download/mcptunnel-$(uname -s | tr A-Z a-z)-$(uname -m) -o mcptunnel
chmod +x mcptunnel
sudo mv mcptunnel /usr/local/bin/`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                From Source (Go)
              </h3>
              <p>Requires Go 1.21 or later:</p>
              <CodeBlock
                id="install-go"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`go install github.com/appsecsanta/mcptunnel@latest`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Verify Installation
              </h3>
              <CodeBlock
                id="install-verify"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`mcptunnel --version`}</CodeBlock>
            </DocSection>

            {/* Quick Start */}
            <DocSection id="quick-start" title="Quick Start">
              <p>
                The fastest way to expose your MCP servers to an AI client:
              </p>

              <StepBlock number={1} title="Start the tunnel">
                <p>This auto-discovers your MCP servers and creates a public tunnel:</p>
                <CodeBlock
                  id="qs-start"
                  language="bash"
                  copied={copied}
                  onCopy={copyToClipboard}
                >{`mcptunnel start`}</CodeBlock>
              </StepBlock>

              <StepBlock number={2} title="Copy the tunnel URL">
                <p>mcpTunnel outputs a public URL like:</p>
                <CodeBlock
                  id="qs-url"
                  language="text"
                  copied={copied}
                  onCopy={copyToClipboard}
                >{`https://api.mcptunnel.sh/mcp`}</CodeBlock>
              </StepBlock>

              <StepBlock number={3} title="Connect your AI client">
                <p>
                  Paste the URL into your AI client&apos;s MCP server configuration. See the{' '}
                  <a href="#platform-setup" style={{ color: 'var(--color-cyan)' }}>Platform Setup</a> section for
                  specific instructions.
                </p>
              </StepBlock>

              <InfoBox color="orange">
                Quick tunnels generate a random URL each time. Use <code className="font-mono text-sm" style={{ color: 'var(--color-orange)' }}>--named-tunnel</code> for a persistent URL.
              </InfoBox>
            </DocSection>

            {/* Auto-Discovery */}
            <DocSection id="auto-discovery" title="Auto-Discovery">
              <p>
                mcpTunnel automatically discovers MCP servers from your existing AI tool configurations. No manual setup required.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                Supported Sources
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Source</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Config Path</th>
                      <th className="text-left py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4">Claude Desktop</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>~/Library/Application Support/Claude/claude_desktop_config.json</td>
                      <td className="py-3 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--source claude</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4">Cursor</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>~/.cursor/mcp.json</td>
                      <td className="py-3 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--source cursor</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4">Continue</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>~/.continue/config.json</td>
                      <td className="py-3 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--source continue</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Custom</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>~/.mcptunnel/servers.json</td>
                      <td className="py-3 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--source mcptunnel</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6">
                By default, mcpTunnel scans all sources. Use <code className="font-mono text-sm" style={{ color: 'var(--color-cyan)' }}>--source</code> to limit discovery to a specific one:
              </p>
              <CodeBlock
                id="discovery-source"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`# Only discover from Claude Desktop config
mcptunnel start --source claude`}</CodeBlock>
            </DocSection>

            {/* Configuration */}
            <DocSection id="configuration" title="Configuration">
              <p>
                For servers not defined in any supported config file, create a custom definition at{' '}
                <code className="font-mono text-sm" style={{ color: 'var(--color-cyan)' }}>~/.mcptunnel/servers.json</code>:
              </p>
              <CodeBlock
                id="config-servers"
                language="json"
                copied={copied}
                onCopy={copyToClipboard}
              >{`{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "API_KEY": "your-key"
      }
    },
    "python-tools": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "env": {}
    }
  }
}`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Server Definition Fields
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Field</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Type</th>
                      <th className="text-left py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>command</td>
                      <td className="py-3 pr-4">string</td>
                      <td className="py-3">The executable to run (e.g., <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>node</code>, <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>python</code>, <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>npx</code>)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>args</td>
                      <td className="py-3 pr-4">string[]</td>
                      <td className="py-3">Command-line arguments passed to the executable</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>env</td>
                      <td className="py-3 pr-4">object</td>
                      <td className="py-3">Environment variables set when spawning the server process</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DocSection>

            {/* CLI Reference */}
            <DocSection id="cli-reference" title="CLI Reference">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                mcptunnel start
              </h3>
              <p>Discovers MCP servers, starts the aggregating HTTP server, and opens a tunnel.</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Flag</th>
                      <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Default</th>
                      <th className="text-left py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--source</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>all</td>
                      <td className="py-3">Config source to discover from: <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>claude</code>, <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>cursor</code>, <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>continue</code>, <code className="font-mono" style={{ color: 'var(--color-text-muted)' }}>mcptunnel</code></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--port</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>3000</td>
                      <td className="py-3">Local HTTP server port</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--quick-tunnel</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>true</td>
                      <td className="py-3">Use a temporary Cloudflare tunnel with random URL</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--named-tunnel</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>-</td>
                      <td className="py-3">Use a persistent named Cloudflare tunnel</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--safe-only</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>false</td>
                      <td className="py-3">Skip servers whose env vars contain detected credentials</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--no-tunnel</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>false</td>
                      <td className="py-3">Run the local HTTP server only, without opening a tunnel</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-cyan)' }}>--verbose</td>
                      <td className="py-3 pr-4 font-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>false</td>
                      <td className="py-3">Enable detailed logging output</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                mcptunnel login
              </h3>
              <p>Authenticate with the mcpTunnel service for named tunnels and dashboard access.</p>
              <CodeBlock
                id="cli-login"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`mcptunnel login`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                mcptunnel --version
              </h3>
              <p>Print the installed version of mcpTunnel.</p>
            </DocSection>

            {/* Tunneling */}
            <DocSection id="tunneling" title="Tunneling">
              <p>
                mcpTunnel uses Cloudflare tunnels to expose your local server to the internet without port forwarding, firewall rules, or a public IP address.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                Quick Tunnel (default)
              </h3>
              <p>Generates a temporary random URL. No account required.</p>
              <CodeBlock
                id="tunnel-quick"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`mcptunnel start --quick-tunnel`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Named Tunnel
              </h3>
              <p>Persistent URL that stays the same across restarts. Requires authentication.</p>
              <CodeBlock
                id="tunnel-named"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`mcptunnel login
mcptunnel start --named-tunnel my-dev-machine`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Local Only (No Tunnel)
              </h3>
              <p>Run the HTTP server on localhost without creating a tunnel. Useful for LAN access or when using your own reverse proxy.</p>
              <CodeBlock
                id="tunnel-local"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`mcptunnel start --no-tunnel --port 8080`}</CodeBlock>
            </DocSection>

            {/* Aggregation */}
            <DocSection id="aggregation" title="Tool Aggregation">
              <p>
                mcpTunnel merges tools, resources, and prompts from all discovered MCP servers into a single endpoint. Tool names are prefixed with the server name to prevent collisions.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                Naming Convention
              </h3>
              <p>
                Tools are namespaced with a double-underscore prefix:{' '}
                <code className="font-mono text-sm" style={{ color: 'var(--color-orange)' }}>servername__toolname</code>
              </p>

              <CodeBlock
                id="agg-example"
                language="text"
                copied={copied}
                onCopy={copyToClipboard}
              >{`# Example: 3 servers aggregated
filesystem__read_file
filesystem__write_file
filesystem__list_directory
git__log
git__diff
git__status
postgres__query
postgres__list_tables`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                MCP Endpoint
              </h3>
              <p>
                The aggregated server is available at <code className="font-mono text-sm" style={{ color: 'var(--color-cyan)' }}>/mcp</code> using Streamable HTTP transport (MCP 2025-03-26 spec). JSON-RPC over HTTP with session management headers.
              </p>
            </DocSection>

            {/* Security */}
            <DocSection id="security" title="Security">
              <InfoBox color="orange">
                Exposing MCP servers to the internet means remote AI clients can invoke your local tools. Review what you expose carefully.
              </InfoBox>

              <h3 className="text-lg font-semibold mb-3 mt-6" style={{ color: 'var(--color-text-primary)' }}>
                Credential Guard
              </h3>
              <p>
                mcpTunnel scans each server&apos;s environment variables for patterns that look like secrets (API keys, tokens, passwords). Servers with detected credentials trigger a warning.
              </p>
              <CodeBlock
                id="sec-safeonly"
                language="bash"
                copied={copied}
                onCopy={copyToClipboard}
              >{`# Skip any server with detected credentials
mcptunnel start --safe-only`}</CodeBlock>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                OAuth Authentication
              </h3>
              <p>
                Named tunnels support OAuth 2.0 authentication, requiring clients to authenticate before accessing your MCP servers. Quick tunnels are publicly accessible by URL — treat the URL as a secret.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-8" style={{ color: 'var(--color-text-primary)' }}>
                Best Practices
              </h3>
              <ul className="space-y-2 mt-4" style={{ color: 'var(--color-text-secondary)' }}>
                {[
                  'Use --safe-only in production to skip servers with credentials',
                  'Prefer named tunnels with OAuth for persistent access',
                  'Never share quick tunnel URLs publicly — they grant full tool access',
                  'Review discovered servers before starting the tunnel',
                  'Use --verbose to inspect what tools and resources are being exposed',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: 'var(--color-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </DocSection>

            {/* Platform Setup */}
            <DocSection id="platform-setup" title="Platform Setup">
              <p>
                Instructions for connecting mcpTunnel to each supported AI client.
              </p>

              <PlatformGuide
                name="ChatGPT"
                description="Web and Desktop app"
                steps={[
                  'Start mcpTunnel: mcptunnel start',
                  'Copy the tunnel URL (e.g., https://api.mcptunnel.sh/mcp)',
                  'In ChatGPT, go to Settings → Connected Apps → Add MCP Server',
                  'Paste the tunnel URL and save',
                ]}
              />

              <PlatformGuide
                name="Claude Desktop"
                description="macOS and Windows app"
                steps={[
                  'Start mcpTunnel: mcptunnel start',
                  'Copy the tunnel URL',
                  'In Claude Desktop, open Settings → MCP Servers → Add Server',
                  'Select "Streamable HTTP" as the transport type',
                  'Paste the tunnel URL and save',
                ]}
              />

              <PlatformGuide
                name="Claude Code"
                description="CLI and IDE extension"
                steps={[
                  'Start mcpTunnel: mcptunnel start',
                  'Copy the tunnel URL',
                  'Run: claude mcp add mcptunnel --transport http <tunnel-url>',
                ]}
              />

              <PlatformGuide
                name="Cursor"
                description="AI Code Editor"
                steps={[
                  'Start mcpTunnel: mcptunnel start',
                  'Copy the tunnel URL',
                  'In Cursor, open Settings → MCP → Add new MCP Server',
                  'Set type to "streamablehttp" and paste the URL',
                ]}
              />
            </DocSection>

            {/* Troubleshooting */}
            <DocSection id="troubleshooting" title="Troubleshooting">
              <TroubleshootItem
                question="mcpTunnel doesn't find any servers"
                answer="Check that your AI tool configs exist at the expected paths. Use --verbose to see which paths are being scanned. You can also define custom servers in ~/.mcptunnel/servers.json."
              />
              <TroubleshootItem
                question="Tunnel URL not working"
                answer="Quick tunnel URLs are temporary and expire when mcpTunnel stops. Restart mcpTunnel to get a new URL, or use --named-tunnel for a persistent one."
              />
              <TroubleshootItem
                question="Connection refused errors"
                answer="Make sure the MCP server process starts successfully. Use --verbose to see server spawn logs. Check that the command and args in your config are correct."
              />
              <TroubleshootItem
                question="Credential warning appears"
                answer="mcpTunnel detected environment variables that look like secrets (API keys, tokens, etc.). Use --safe-only to skip those servers, or review the warning and proceed if intended."
              />
              <TroubleshootItem
                question="Port already in use"
                answer="Another process is using port 3000. Use --port to specify a different port: mcptunnel start --port 8080"
              />
            </DocSection>

            {/* Footer CTA */}
            <div
              className="mt-16 p-8 rounded-xl text-center"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                Need help?
              </h3>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                Open an issue on GitHub or check the README for the latest updates.
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://github.com/appsecsanta/mcp-tunnel/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  Open an Issue
                </a>
                <a
                  href="https://github.com/appsecsanta/mcp-tunnel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components ---

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-28">
      <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {children}
      </div>
    </section>
  );
}

function CodeBlock({
  id,
  language,
  children,
  copied,
  onCopy,
}: {
  id: string;
  language: string;
  children: string;
  copied: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  return (
    <div className="relative group mt-3 mb-4">
      <div className="code-block">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{language}</span>
          <button
            onClick={() => onCopy(children, id)}
            className="p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100"
            style={{
              background: 'var(--color-bg-hover)',
              color: copied === id ? 'var(--color-green)' : 'var(--color-text-muted)',
            }}
          >
            {copied === id ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto"><code style={{ color: 'var(--color-text-primary)' }}>{children}</code></pre>
      </div>
    </div>
  );
}

function InfoBox({ color, children }: { color: 'cyan' | 'orange'; children: ReactNode }) {
  const colors = {
    cyan: { bg: 'rgba(0, 212, 255, 0.05)', border: 'rgba(0, 212, 255, 0.2)', icon: 'var(--color-cyan)' },
    orange: { bg: 'rgba(229, 115, 72, 0.05)', border: 'rgba(229, 115, 72, 0.2)', icon: 'var(--color-orange)' },
  };
  const c = colors[color];

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-lg mt-4 text-sm"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: c.icon }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div style={{ color: 'var(--color-text-secondary)' }}>{children}</div>
    </div>
  );
}

function StepBlock({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 mt-6">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 mt-0.5"
        style={{ background: 'var(--color-cyan)', color: 'var(--color-bg-primary)' }}
      >
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{title}</h4>
        <div className="space-y-3" style={{ color: 'var(--color-text-secondary)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({ title, description, href, color }: { title: string; description: string; href: string; color: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'var(--color-cyan)',
    orange: 'var(--color-orange)',
    green: 'var(--color-green)',
  };

  return (
    <a
      href={href}
      className="block p-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h4 className="font-semibold mb-1" style={{ color: colorMap[color] }}>{title}</h4>
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
    </a>
  );
}

function PlatformGuide({ name, description, steps }: { name: string; description: string; steps: string[] }) {
  return (
    <div
      className="p-6 rounded-xl mt-6"
      style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{name}</h3>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-bg-hover)', color: 'var(--color-text-muted)' }}>
          {description}
        </span>
      </div>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="font-mono text-xs mt-0.5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TroubleshootItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="py-5" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{question}</h4>
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{answer}</p>
    </div>
  );
}
