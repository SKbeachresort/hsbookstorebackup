import { getCookie } from 'cookies-next';

export const getAccessToken = (): string | null => {
  const token = getCookie('accessToken'); 
  return typeof token === 'string' ? token : null;
};
