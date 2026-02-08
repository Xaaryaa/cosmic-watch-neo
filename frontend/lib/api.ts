export interface Asteroid {
  id: string;
  name: string;
  diameter: number;
  velocity: number;
  miss_distance: number;
  risk_score: number;
  neo_reference_id: string;
}

export interface Stats {
  total_neos: number;
  hazardous_count: number;
  closest_distance: number;
  fastest_velocity: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001/api';

export const api = {
  getAsteroids: async (): Promise<Asteroid[]> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(`${API_BASE_URL}/asteroids`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Failed to fetch asteroids');
      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.warn('Fetch asteroids timed out');
      } else {
        console.error('Error fetching asteroids:', error);
      }
      return [];
    }
  },

  getStats: async (): Promise<Stats | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(`${API_BASE_URL}/stats`, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.warn('Fetch stats timed out');
      } else {
        console.error('Error fetching stats:', error);
      }
      return null;
    }
  },

  // Auth
  login: async (email: string, password: string): Promise<{ token: string, message: string }> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Login failed');
    }
    return await response.json();
  },

  register: async (fullName: string, email: string, password: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, email, password })
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Registration failed');
    }
    return await response.json();
  },

  // Watchlist
  getWatchlist: async (token: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/watchlist`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch watchlist');
    return await response.json();
  },

  addToWatchlist: async (token: string, asteroidId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ asteroid_id: parseInt(asteroidId) })
    });
    if (!response.ok) throw new Error('Failed to add to watchlist');
  },

  removeFromWatchlist: async (token: string, asteroidId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/watchlist/${asteroidId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to remove from watchlist');
  }
};
