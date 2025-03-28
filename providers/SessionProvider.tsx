import { STORAGE_KEYS } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  session: Session | null;
  sessionLoading: boolean;
  // eslint-disable-next-line
  signIn: (phone: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthContextType>({
  session: null,
  sessionLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const loggedInUserId = await AsyncStorage.getItem(
        STORAGE_KEYS.LOGGED_IN_USER_ID
      );
      const { data } = await supabase.auth.getSession();
      if (data && loggedInUserId) {
        setSession(data.session);
        return setSessionLoading(false);
      } else {
        return setSessionLoading(false);
      }
    };
    getSession();
  }, [session]);

  const signIn = async (phone: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    });
    if (error) throw error;
    if (data?.user?.id) {
      await AsyncStorage.setItem(STORAGE_KEYS.LOGGED_IN_USER_ID, data.user.id);
      setSession(data.session);
      setSessionLoading(false);
      router.replace('/(main)');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem(STORAGE_KEYS.LOGGED_IN_USER_ID);
    setSession(null);
    setSessionLoading(false);
    router.replace('/auth');
  };

  return (
    <AuthContext.Provider value={{ session, sessionLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
