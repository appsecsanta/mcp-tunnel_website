'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  plan: 'free',
};

const mockTunnels = [
  {
    id: '1',
    name: 'dev-machine',
    url: 'https://mcptunnel.sh/t/abc123',
    status: 'online',
    lastActive: '2 minutes ago',
    connections: 3,
  },
  {
    id: '2',
    name: 'home-server',
    url: 'https://mcptunnel.sh/t/def456',
    status: 'offline',
    lastActive: '2 days ago',
    connections: 0,
  },
];

export default function DashboardPage() {
  const [tunnels] = useState(mockTunnels);
  const [user] = useState(mockUser);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Navigation */}
      <nav style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-cyan)' }}>
                <svg className="w-5 h-5" style={{ color: 'var(--color-bg-primary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>mcpTunnel</span>
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/appsecsanta/mcp-tunnel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>

              <div className="flex items-center gap-3 pl-4" style={{ borderLeft: '1px solid var(--color-border)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
                  style={{ background: 'var(--color-cyan)', color: 'var(--color-bg-primary)' }}
                >
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{user.name}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{user.plan} plan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Your Tunnels
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Manage your mcpTunnel connections
            </p>
          </div>
          <button className="btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Tunnel
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Active Tunnels</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--color-cyan)' }}>
              {tunnels.filter(t => t.status === 'online').length}
            </div>
          </div>
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Total Tunnels</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
              {tunnels.length}
            </div>
          </div>
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Connections</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
              {tunnels.reduce((acc, t) => acc + t.connections, 0)}
            </div>
          </div>
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Plan</div>
            <div className="text-2xl font-bold font-mono capitalize" style={{ color: 'var(--color-text-primary)' }}>
              {user.plan}
            </div>
          </div>
        </div>

        {/* Quick Start */}
        {tunnels.length === 0 && (
          <div className="card p-8 text-center mb-8">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(0, 212, 255, 0.1)' }}
            >
              <svg className="w-7 h-7" style={{ color: 'var(--color-cyan)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Get Started</h3>
            <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Install mcpTunnel and create your first tunnel
            </p>
            <div className="code-block max-w-sm mx-auto text-left text-sm">
              <div><span style={{ color: 'var(--color-text-muted)' }}>$</span> <span style={{ color: 'var(--color-green)' }}>brew install appsecsanta/tap/mcptunnel</span></div>
              <div className="mt-1"><span style={{ color: 'var(--color-text-muted)' }}>$</span> <span style={{ color: 'var(--color-cyan)' }}>mcptunnel start</span></div>
            </div>
          </div>
        )}

        {/* Tunnels List */}
        {tunnels.length > 0 && (
          <div className="space-y-3">
            {tunnels.map((tunnel) => (
              <div key={tunnel.id} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: tunnel.status === 'online' ? 'rgba(74, 222, 128, 0.1)' : 'var(--color-bg-tertiary)',
                        color: tunnel.status === 'online' ? 'var(--color-green)' : 'var(--color-text-muted)'
                      }}
                    >
                      {tunnel.status === 'online' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{tunnel.name}</span>
                        <span
                          className="badge text-xs"
                          style={{
                            background: tunnel.status === 'online' ? 'rgba(74, 222, 128, 0.1)' : 'var(--color-bg-tertiary)',
                            color: tunnel.status === 'online' ? 'var(--color-green)' : 'var(--color-text-muted)',
                            border: 'none'
                          }}
                        >
                          {tunnel.status}
                        </span>
                      </div>
                      <code className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        {tunnel.url}
                      </code>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      <div>
                        <span className="block text-xs uppercase">Last Active</span>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{tunnel.lastActive}</span>
                      </div>
                      <div>
                        <span className="block text-xs uppercase">Connections</span>
                        <span style={{ color: 'var(--color-text-secondary)' }}>{tunnel.connections}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(tunnel.id, tunnel.url)}
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          background: 'var(--color-bg-tertiary)',
                          color: copiedId === tunnel.id ? 'var(--color-green)' : 'var(--color-text-muted)'
                        }}
                        title="Copy URL"
                      >
                        {copiedId === tunnel.id ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}
                        title="Settings"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* API Key Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            API Access
          </h2>
          <div className="card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>API Token</div>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Use this token to authenticate with the mcpTunnel API
                </p>
              </div>
              <button className="btn-secondary text-sm px-4 py-2">
                Generate Token
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
