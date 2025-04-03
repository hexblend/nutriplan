import { setAppLanguage } from '@/i18n/translations';
import { STORAGE_KEYS } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';
import { Tables } from '@/supabase/database.types';
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
  currentClient: Tables<'clients'> | null;
  setCurrentClient: React.Dispatch<
    React.SetStateAction<Tables<'clients'> | null>
  >;
  currentProfile: Tables<'profiles'> | null;
  setCurrentProfile: React.Dispatch<
    React.SetStateAction<Tables<'profiles'> | null>
  >;
};
const AuthContext = createContext<AuthContextType>({
  session: null,
  sessionLoading: true,
  signIn: async () => {},
  signOut: async () => {},
  currentClient: null,
  setCurrentClient: () => {},
  currentProfile: null,
  setCurrentProfile: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState<Tables<'clients'> | null>(
    null
  );
  const [currentProfile, setCurrentProfile] =
    useState<Tables<'profiles'> | null>(null);

  // Get the session
  useEffect(() => {
    const getSession = async () => {
      const loggedInUserId = await AsyncStorage.getItem(
        STORAGE_KEYS.LOGGED_IN_USER_ID
      );
      const { data } = await supabase.auth.getSession();
      if (data && loggedInUserId) {
        setSession(data.session);
        // Get the client
        const { data: clientData } = await supabase
          .from('clients')
          .select('*')
          .eq('user_id', loggedInUserId)
          .single();
        setCurrentClient(clientData);
        // Get the profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', loggedInUserId)
          .single();
        setCurrentProfile(profileData);
        // Init app language
        setAppLanguage(profileData?.updated_app_language);
        return setSessionLoading(false);
      } else {
        // Init app language
        setAppLanguage(null);
        return setSessionLoading(false);
      }
    };
    getSession();
  }, []);

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
      router.replace('/(tabs)');
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
    <AuthContext.Provider
      value={{
        session,
        sessionLoading,
        signIn,
        signOut,
        currentClient,
        setCurrentClient,
        currentProfile,
        setCurrentProfile,
      }}
    >
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
