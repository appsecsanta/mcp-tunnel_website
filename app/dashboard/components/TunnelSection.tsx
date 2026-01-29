'use client';

import { useState } from 'react';
import type { Tunnel } from '@/lib/api';

interface TunnelSectionProps {
  tunnels: Tunnel[];
}

export default function TunnelSection({ tunnels }: TunnelSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, hostname: string) => {
    navigator.clipboard.writeText(hostname);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (dateStr: string | null): string => {
    if (!dateStr) return 'Never';
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (tunnels.length === 0) {
    return (
      <div className="card p-8 text-center mb-8">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(0, 212, 255, 0.1)' }}
        >
          <svg className="w-7 h-7" style={{ color: 'var(--color-cyan)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          No tunnels yet
        </h3>
        <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Create an API key above, then start your tunnel with:
        </p>
        <div className="code-block max-w-md mx-auto text-left text-sm">
          <div>
            <span style={{ color: 'var(--color-text-muted)' }}>$</span>{' '}
            <span style={{ color: 'var(--color-green)' }}>mcptunnel start --token mct_your_key</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-8">
      {tunnels.map((tunnel) => (
        <div key={tunnel.id} className="card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: tunnel.status === 'online' ? 'rgba(74, 222, 128, 0.1)' : 'var(--color-bg-tertiary)',
                  color: tunnel.status === 'online' ? 'var(--color-green)' : 'var(--color-text-muted)',
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
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {tunnel.name}
                  </span>
                  <span
                    className="badge text-xs"
                    style={{
                      background: tunnel.status === 'online' ? 'rgba(74, 222, 128, 0.1)' : 'var(--color-bg-tertiary)',
                      color: tunnel.status === 'online' ? 'var(--color-green)' : 'var(--color-text-muted)',
                      border: 'none',
                    }}
                  >
                    {tunnel.status}
                  </span>
                </div>
                <code className="text-sm font-mono" style={{ color: 'var(--color-text-muted)' }}>
                  {tunnel.hostname}
                </code>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <div>
                  <span className="block text-xs uppercase">Last Active</span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {formatTime(tunnel.lastHeartbeat)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopy(tunnel.id, tunnel.hostname)}
                className="p-2 rounded-lg transition-colors"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  color: copiedId === tunnel.id ? 'var(--color-green)' : 'var(--color-text-muted)',
                }}
                title="Copy hostname"
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
