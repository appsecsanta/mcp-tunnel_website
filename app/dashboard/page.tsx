'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.llmpair.io';

interface User {
  id: string;
  email: string;
  tier: 'free' | 'pro';
}

interface Tunnel {
  url: string;
  token: string;
  mcp_endpoint: string;
}

interface Usage {
  daily_requests: number;
  daily_limit: number;
  tier: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tunnel, setTunnel] = useState<Tunnel | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Load user data
    const userData = localStorage.getItem('user');
    const tunnelData = localStorage.getItem('tunnel');

    if (userData) setUser(JSON.parse(userData));
    if (tunnelData) setTunnel(JSON.parse(tunnelData));

    // Fetch fresh data from API
    fetchUserData(token);
    fetchUsageData(token);

    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (tunnel?.url) {
      checkConnection(tunnel.url);
      const interval = setInterval(() => checkConnection(tunnel.url), 30000);
      return () => clearInterval(interval);
    }
  }, [tunnel]);

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        if (data.data.tunnel) {
          setTunnel(data.data.tunnel);
          localStorage.setItem('tunnel', JSON.stringify(data.data.tunnel));
        }
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  };

  const fetchUsageData = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/user/usage`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsage(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch usage data:', err);
    }
  };

  const checkConnection = async (url: string) => {
    setConnectionStatus('checking');
    try {
      const res = await fetch(`${url}/health`, {
        method: 'GET',
        mode: 'cors',
      });
      setConnectionStatus(res.ok ? 'online' : 'offline');
    } catch {
      setConnectionStatus('offline');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user');
    localStorage.removeItem('tunnel');
    router.push('/');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            <span className="font-bold text-xl">LLMPair</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              user?.tier === 'pro'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {user?.tier?.toUpperCase()}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Connection Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Connection Status</h2>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                connectionStatus === 'online' ? 'bg-green-500' :
                connectionStatus === 'offline' ? 'bg-red-500' :
                'bg-yellow-500 animate-pulse'
              }`} />
              <span className="text-sm font-medium capitalize">
                {connectionStatus === 'checking' ? 'Checking...' : connectionStatus}
              </span>
            </div>
          </div>

          {connectionStatus === 'offline' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <p className="text-red-800 dark:text-red-200 text-sm">
                Your local machine is not connected. Make sure <code className="bg-red-100 dark:bg-red-800 px-1 rounded">llmpair start</code> is running.
              </p>
            </div>
          )}

          {tunnel && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Tunnel URL
                </label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm">
                    {tunnel.url}
                  </code>
                  <button
                    onClick={() => copyToClipboard(tunnel.url)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  MCP Endpoint
                </label>
                <div className="flex gap-2">
                  <code className="flex-1 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm">
                    {tunnel.mcp_endpoint}
                  </code>
                  <button
                    onClick={() => copyToClipboard(tunnel.mcp_endpoint)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}

          {!tunnel && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                No tunnel configured. Run <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">llmpair login</code> on your local machine to set up your tunnel.
              </p>
            </div>
          )}
        </div>

        {/* Usage Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Usage</h2>
            {usage && (
              <>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-bold">{usage.daily_requests}</span>
                  <span className="text-gray-500">/ {usage.daily_limit} requests</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((usage.daily_requests / usage.daily_limit) * 100, 100)}%` }}
                  />
                </div>
                {usage.daily_requests >= usage.daily_limit * 0.8 && user?.tier === 'free' && (
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
                    Running low on requests.{' '}
                    <Link href="/dashboard/billing" className="underline">
                      Upgrade to Pro
                    </Link>{' '}
                    for unlimited.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Account created
              </p>
              <p className={`flex items-center gap-2 ${tunnel ? '' : 'opacity-50'}`}>
                <span className={tunnel ? 'text-green-500' : 'text-gray-400'}>
                  {tunnel ? '✓' : '○'}
                </span>
                Tunnel configured
              </p>
              <p className={`flex items-center gap-2 ${connectionStatus === 'online' ? '' : 'opacity-50'}`}>
                <span className={connectionStatus === 'online' ? 'text-green-500' : 'text-gray-400'}>
                  {connectionStatus === 'online' ? '✓' : '○'}
                </span>
                Local machine connected
              </p>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Add to Claude Desktop</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              To use LLMPair with Claude Desktop:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Open Claude Desktop Settings</li>
              <li>Go to "MCP Servers"</li>
              <li>Click "Add Remote MCP"</li>
              <li>
                Enter the MCP endpoint:{' '}
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {tunnel?.mcp_endpoint || 'https://your-tunnel.llmpair.io/mcp'}
                </code>
              </li>
            </ol>
            <p className="text-sm text-gray-500">
              Make sure <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">llmpair start</code> is running on your local machine.
            </p>
          </div>
        </div>

        {/* Upgrade CTA for free users */}
        {user?.tier === 'free' && (
          <div className="mt-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Upgrade to Pro</h3>
                <p className="text-primary-100">
                  Get unlimited requests, custom subdomain, and priority support.
                </p>
              </div>
              <Link
                href="/dashboard/billing"
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Upgrade for $9.99/mo
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
