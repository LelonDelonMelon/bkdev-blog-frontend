async function refreshToken(oldToken: string | null): Promise<string> {
  if (!oldToken) throw new Error('No token to refresh');
  
  try {
    const response = await fetch('http://localhost:3000/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: oldToken
      })
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('jwtToken', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

export async function fetchWithTokenRefresh(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${JSON.stringify({
          access_token: localStorage.getItem('jwtToken')
        })}`,
      },
    });

    // Clone the response before checking it
    const responseClone = response.clone();

    if (response.status === 401) {
      const errorData = await response.json();
      if (errorData.code === 'TOKEN_EXPIRED') {
        const oldToken = localStorage.getItem('jwtToken');
        const newToken = await refreshToken(oldToken);
        
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${JSON.stringify({
              access_token: newToken
            })}`,
          },
        });
      }
    }
    return responseClone;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
