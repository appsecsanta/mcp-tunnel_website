'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMe, logout, getAPIKeys, getTunnels } from '@/lib/api';
import type { User, APIKey, Tunnel } from '@/lib/api';
import APIKeySection from './components/APIKeySection';
import TunnelSection from './components/TunnelSection';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [me, tunnelData, keyData] = await Promise.all([
      getMe(),
      getTunnels().catch(() => []),
      getAPIKeys().catch(() => []),
    ]);

    if (!me) {
      router.replace('/login');
      return;
    }

    setUser(me);
    setTunnels(tunnelData);
    setApiKeys(keyData);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const refreshKeys = async () => {
    const keys = await getAPIKeys().catch(() => []);
    setApiKeys(keys);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg-primary)' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>Loading...</div>
      </div>
    );
  }

  const onlineTunnels = tunnels.filter((t) => t.status === 'online').length;

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
                  {user?.name?.charAt(0) || '?'}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{user?.name}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                  title="Sign out"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Active Tunnels</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--color-cyan)' }}>
              {onlineTunnels}
            </div>
          </div>
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Total Tunnels</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
              {tunnels.length}
            </div>
          </div>
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>API Keys</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--color-text-primary)' }}>
              {apiKeys.length}
            </div>
          </div>
          <div className="card">
            <div className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>Plan</div>
            <div className="text-2xl font-bold font-mono capitalize" style={{ color: 'var(--color-text-primary)' }}>
              Free
            </div>
          </div>
        </div>

        {/* Tunnels */}
        <TunnelSection tunnels={tunnels} />

        {/* API Keys */}
        <APIKeySection keys={apiKeys} onKeysChange={refreshKeys} />
      </main>
    </div>
  );
}
