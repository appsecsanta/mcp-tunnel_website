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

export default function BillingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('session_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, [router]);

  const handleUpgrade = async () => {
    setLoading(true);
    const token = localStorage.getItem('session_token');

    try {
      const res = await fetch(`${API_URL}/api/billing/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan: 'pro',
          success_url: `${window.location.origin}/dashboard/billing?success=true`,
          cancel_url: `${window.location.origin}/dashboard/billing?canceled=true`,
        }),
      });

      const data = await res.json();

      if (data.success && data.data.checkout_url) {
        window.location.href = data.data.checkout_url;
      } else {
        alert('Failed to create checkout session. Please try again.');
      }
    } catch (err) {
      alert('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    const token = localStorage.getItem('session_token');

    try {
      const res = await fetch(`${API_URL}/api/billing/portal`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success && data.data.portal_url) {
        window.location.href = data.data.portal_url;
      } else {
        alert('Failed to open billing portal. Please try again.');
      }
    } catch (err) {
      alert('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            <span className="font-bold text-xl">LLMPair</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Billing</h1>

        {/* Current Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold mb-1">
                {user?.tier === 'pro' ? 'Pro' : 'Free'}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {user?.tier === 'pro'
                  ? 'Unlimited requests, custom subdomain'
                  : '100 requests per day'}
              </p>
            </div>
            {user?.tier === 'pro' && (
              <button
                onClick={handleManageSubscription}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
              >
                Manage Subscription
              </button>
            )}
          </div>
        </div>

        {/* Plans Comparison */}
        <h2 className="text-xl font-semibold mb-4">Compare Plans</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Plan */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-6 ${
            user?.tier === 'free'
              ? 'border-primary-500'
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            {user?.tier === 'free' && (
              <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium px-2 py-1 rounded mb-4">
                Current Plan
              </span>
            )}
            <h3 className="text-2xl font-bold mb-1">Free</h3>
            <p className="text-3xl font-bold mb-4">
              $0 <span className="text-base font-normal text-gray-500">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              <PlanFeature>100 requests per day</PlanFeature>
              <PlanFeature>1 tunnel</PlanFeature>
              <PlanFeature>File read/write access</PlanFeature>
              <PlanFeature>Shell commands</PlanFeature>
              <PlanFeature>Community support</PlanFeature>
            </ul>
            {user?.tier === 'free' && (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              >
                Current Plan
              </button>
            )}
          </div>

          {/* Pro Plan */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-6 ${
            user?.tier === 'pro'
              ? 'border-primary-500'
              : 'border-gray-200 dark:border-gray-700'
          }`}>
            {user?.tier === 'pro' && (
              <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium px-2 py-1 rounded mb-4">
                Current Plan
              </span>
            )}
            <h3 className="text-2xl font-bold mb-1">Pro</h3>
            <p className="text-3xl font-bold mb-4">
              $9.99 <span className="text-base font-normal text-gray-500">/month</span>
            </p>
            <ul className="space-y-3 mb-6">
              <PlanFeature highlighted>Unlimited requests</PlanFeature>
              <PlanFeature highlighted>Custom subdomain</PlanFeature>
              <PlanFeature>File read/write access</PlanFeature>
              <PlanFeature>Shell commands</PlanFeature>
              <PlanFeature highlighted>Priority support</PlanFeature>
              <PlanFeature highlighted>Advanced shell tools</PlanFeature>
            </ul>
            {user?.tier === 'free' ? (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Upgrade to Pro'}
              </button>
            ) : (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              >
                Current Plan
              </button>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQ
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period."
            />
            <FAQ
              question="What payment methods do you accept?"
              answer="We accept all major credit cards through our secure payment processor, Stripe."
            />
            <FAQ
              question="What happens if I exceed my free tier limit?"
              answer="If you hit the 100 request daily limit on the free tier, you'll need to wait until the next day or upgrade to Pro for unlimited requests."
            />
            <FAQ
              question="Do you offer refunds?"
              answer="We offer a full refund within 14 days of your first payment if you're not satisfied with the service."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function PlanFeature({
  children,
  highlighted,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <li className="flex items-center gap-2">
      <span className={highlighted ? 'text-primary-500' : 'text-green-500'}>✓</span>
      <span className={highlighted ? 'font-medium' : ''}>{children}</span>
    </li>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 text-left flex justify-between items-center"
      >
        <span className="font-medium">{question}</span>
        <span className={`transform transition ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
}
