const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.mcptunnel.sh";

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const resp = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!resp.ok) {
    const body = await resp.json().catch(() => ({ error: "Request failed" }));
    throw new Error((body as { error?: string }).error || `HTTP ${resp.status}`);
  }

  return resp.json() as Promise<T>;
}

// ==================== Auth ====================

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

export async function getMe(): Promise<User | null> {
  try {
    const data = await fetchAPI<{ user: User | null }>("/auth/me");
    return data.user;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await fetchAPI("/auth/logout", { method: "POST" });
}

export function getGitHubLoginURL(): string {
  return `${API_BASE}/auth/github`;
}

export function getGoogleLoginURL(): string {
  return `${API_BASE}/auth/google`;
}

// ==================== API Keys ====================

export interface APIKey {
  id: string;
  prefix: string;
  name: string;
  lastUsedAt: string | null;
  createdAt: string;
}

export async function getAPIKeys(): Promise<APIKey[]> {
  const data = await fetchAPI<{ keys: APIKey[] }>("/api/keys");
  return data.keys;
}

export async function createAPIKey(name: string): Promise<{ id: string; key: string; prefix: string }> {
  return fetchAPI("/api/keys", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function deleteAPIKey(id: string): Promise<void> {
  await fetchAPI(`/api/keys/${id}`, { method: "DELETE" });
}

// ==================== Tunnels ====================

export interface Tunnel {
  id: string;
  name: string;
  hostname: string;
  status: "online" | "offline";
  lastHeartbeat: string | null;
  createdAt: string;
}

export async function getTunnels(): Promise<Tunnel[]> {
  const data = await fetchAPI<{ tunnels: Tunnel[] }>("/api/tunnels");
  return data.tunnels;
}
