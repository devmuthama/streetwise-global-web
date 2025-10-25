import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession, setAuthStatus } from '@/features/auth/authSlice';
import { supabase } from '@/lib/supabaseClient';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // 1. Check initial session
    if (authStatus === 'idle') {
      dispatch(checkUserSession());
    }

    // 2. Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          // Re-check session to get profile data
          dispatch(checkUserSession());
        }
        if (event === 'SIGNED_OUT') {
          // We can just clear state
          dispatch({ type: 'auth/signOutUser/fulfilled' });
        }
      }
    );

    // 3. Cleanup listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch, authStatus]);
};