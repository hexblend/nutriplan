import { supabase } from '@/lib/supabase/client';
import { throwError } from '@/lib/utils';
import { useSession } from '@/providers/SessionProvider';
import { Tables } from '@/supabase/database.types';
import { useEffect, useState } from 'react';

export function useGetClientUpdates() {
  const { currentClient } = useSession();

  const [clientUpdates, setClientUpdates] = useState<
    Tables<'client_updates'>[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientUpdates = async () => {
      if (!currentClient?.id) return setLoading(false);
      const { data, error } = await supabase
        .from('client_updates')
        .select('*')
        .eq('client_id', currentClient.id)
        .order('date', { ascending: true });
      if (error)
        throwError('[client_updates] Error fetching client updates', error);
      setClientUpdates(data || []);
      setLoading(false);
    };

    fetchClientUpdates();
  }, [currentClient?.id]);

  return {
    clientUpdates,
    loading,
  };
}
