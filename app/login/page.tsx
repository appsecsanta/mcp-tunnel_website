'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.llmpair.io';

function LoginForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'success'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tunnelUrl, setTunnelUrl] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Failed to send verification code');
        return;
      }

      setStep('code');
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Invalid code');
        return;
      }

      // Store session token
      localStorage.setItem('session_token', data.data.session_token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      if (data.data.tunnel) {
        setTunnelUrl(data.data.tunnel.url);
        localStorage.setItem('tunnel', JSON.stringify(data.data.tunnel));
      }

      setStep('success');
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-4xl">🔗</span>
          <span className="font-bold text-2xl">LLMPair</span>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {step === 'email' && (
            <>
              <h1 className="text-2xl font-bold mb-2 text-center">
                Welcome to LLMPair
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Sign in with your email to get started
              </p>

              {plan === 'pro' && (
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-6">
                  <p className="text-primary-800 dark:text-primary-200 text-sm">
                    ✨ You're signing up for <strong>Pro</strong>. You'll be redirected to complete payment after verification.
                  </p>
                </div>
              )}

              <form onSubmit={handleEmailSubmit}>
                <label className="block text-sm font-medium mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                />

                {error && (
                  <p className="mt-3 text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Continue with Email'}
                </button>
              </form>
            </>
          )}

          {step === 'code' && (
            <>
              <h1 className="text-2xl font-bold mb-2 text-center">
                Check your email
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                We sent a verification code to <strong>{email}</strong>
              </p>

              <form onSubmit={handleCodeSubmit}>
                <label className="block text-sm font-medium mb-2">
                  Verification code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="XXXXXX"
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-center text-2xl tracking-widest font-mono"
                />

                {error && (
                  <p className="mt-3 text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading || code.length < 6}
                  className="w-full mt-6 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>

              <button
                onClick={() => setStep('email')}
                className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                ← Use a different email
              </button>
            </>
          )}

          {step === 'success' && (
            <>
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold mb-2">You're all set!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your LLMPair account is ready.
                </p>
              </div>

              {tunnelUrl && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium mb-2">Your Tunnel URL:</p>
                  <code className="text-primary-600 dark:text-primary-400 break-all">
                    {tunnelUrl}
                  </code>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href="/dashboard"
                  className="block w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center"
                >
                  Go to Dashboard
                </Link>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                      or install the CLI
                    </span>
                  </div>
                </div>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  curl -L get.llmpair.io | sh
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
