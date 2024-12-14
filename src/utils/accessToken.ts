import { getCookie } from 'cookies-next';

export const getAccessToken = (): string | null => {
  const token = localStorage.getItem('access_token'); 
  return typeof token === 'string' ? token : null;
};
