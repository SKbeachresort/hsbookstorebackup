"use client";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/utils/accessToken";

export const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};