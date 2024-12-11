"use client";
import { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useAuth } from '@/context/AuthContext'; 
import BackDropLoader from '@/app/elements/BackdropLoader';

export const useLogout = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const [isloading, setIsLoading] = useState(false); 

  const logout = async () => {
    try {
      setIsLoading(true); 

      setCookie('accessToken', '', { maxAge: -1 });
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);

      await router.push('auth/login');
    } catch (error) {
      console.error("Logout Error: ", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return { logout, isloading }; 
};