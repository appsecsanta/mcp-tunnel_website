'use client';

import { useState } from 'react';
import type { APIKey } from '@/lib/api';
import { createAPIKey, deleteAPIKey } from '@/lib/api';

interface APIKeySectionProps {
  keys: APIKey[];
  onKeysChange: () => void;
}

export default function APIKeySection({ keys, onKeysChange }: APIKeySectionProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!newKeyName.trim()) return;
    setLoading(true);
    try {
      const result = await createAPIKey(newKeyName.trim());
      setCreatedKey(result.key);
      setNewKeyName('');
      setShowCreate(false);
      onKeysChange();
    } catch (err) {
      console.error('Failed to create API key:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAPIKey(id);
      setDeleteConfirm(null);
      onKeysChange();
    } catch (err) {
      console.error('Failed to delete API key:', err);
    }
  };

  const handleCopyKey = () => {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          API Keys
        </h2>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-secondary text-sm px-4 py-2"
        >
          Create Key
        </button>
      </div>

      {/* New key created modal */}
      {createdKey && (
        <div className="card p-5 mb-4" style={{ border: '1px solid var(--color-cyan)' }}>
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(0, 212, 255, 0.1)' }}
            >
              <svg className="w-4 h-4" style={{ color: 'var(--color-cyan)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                API key created! Copy it now — it won&apos;t be shown again.
              </p>
              <div className="flex items-center gap-2">
                <code
                  className="text-sm font-mono px-3 py-1.5 rounded flex-1 truncate"
                  style={{ background: 'var(--color-bg-primary)', color: 'var(--color-cyan)' }}
                >
                  {createdKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="px-3 py-1.5 rounded text-sm font-medium flex-shrink-0"
                  style={{
                    background: copied ? 'rgba(74, 222, 128, 0.1)' : 'var(--color-bg-tertiary)',
                    color: copied ? 'var(--color-green)' : 'var(--color-text-primary)',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <button
              onClick={() => setCreatedKey(null)}
              className="p-1 rounded flex-shrink-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Create key form */}
      {showCreate && (
        <div className="card p-5 mb-4">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                Key name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., My Laptop"
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{
                  background: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border)',
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                autoFocus
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={loading || !newKeyName.trim()}
              className="btn-primary text-sm px-4 py-2"
              style={{ opacity: loading || !newKeyName.trim() ? 0.5 : 1 }}
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
            <button
              onClick={() => { setShowCreate(false); setNewKeyName(''); }}
              className="btn-secondary text-sm px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Key list */}
      {keys.length === 0 && !showCreate ? (
        <div className="card p-5 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            No API keys yet. Create one to connect your CLI.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {keys.map((key) => (
            <div key={key.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <code
                    className="text-sm font-mono px-2 py-1 rounded"
                    style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}
                  >
                    {key.prefix}...
                  </code>
                  <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {key.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {key.lastUsedAt
                      ? `Last used ${new Date(key.lastUsedAt).toLocaleDateString()}`
                      : 'Never used'}
                  </span>
                  {deleteConfirm === key.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(key.id)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-muted)' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(key.id)}
                      className="p-1.5 rounded transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                      title="Revoke key"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
