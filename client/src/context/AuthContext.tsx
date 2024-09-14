import React, { useState, createContext, useEffect } from "react";
import axios from 'axios';
import { API_BASE } from '@/constants.ts';
import Cookies from 'js-cookie';
import type { User } from '@/types'

type AuthContextType = {
  user: User;
  error: string;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: "",
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {}, 
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('authtoken');
      const { data: userData } = await axios.get<User>(API_BASE + '/get-session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(userData);
      setError("");
    } catch (err: any) {
      console.log("Not logged in");
      setUser(null);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      if (user) {
        await logout();
      }
      const session = await axios.post(API_BASE + '/login', { username, password });
      Cookies.set('authtoken', session.data?.jwt_token, { expires: 7 });
      setError("");
      await fetchUserData();
    } catch (err: any) {
      console.log(err);
      await fetchUserData();
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (firstName: string, lastName: string, username: string, email: string, password: string): Promise<void> => {
    try {
      await axios.post(API_BASE + '/register', { firstName, lastName, username, email, password });
      setError("");
    } catch (err: any) {
      throw new Error("Failed to create your account");
    }
  };

  const logout = (): void => {
    try {
      Cookies.remove('authtoken');
      setUser(null);
    } catch (err: any) {
      throw new Error("Failed to logout");
      console.error("Error logging out:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ error, user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};