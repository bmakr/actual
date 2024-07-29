import { useState, useEffect } from 'react';

export function useCookie({ key }: { key: string }): string | undefined {
  const [cookieValue, setCookieValue] = useState<string | undefined>(() => {
    return getCookieValue(key);
  });

  useEffect(() => {
    const handleCookieChange = () => {
      setCookieValue(getCookieValue(key));
    };

    // Check for cookie changes every second
    const intervalId = setInterval(handleCookieChange, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [key]);

  return cookieValue;
}

function getCookieValue(key: string): string | undefined {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(row => row.startsWith(key + '='));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined;
}

export default useCookie;