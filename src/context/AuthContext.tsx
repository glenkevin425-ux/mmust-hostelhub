import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { authIsConfigured, supabase } from "../lib/supabase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string, registrationNumber: string) => Promise<{ error?: string; needsEmailConfirmation?: boolean }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function configurationError() {
  return "Authentication is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel environment variables.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    configured: authIsConfigured,
    async signIn(email, password) {
      if (!supabase || !authIsConfigured) return { error: configurationError() };
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error ? { error: error.message } : {};
      } catch {
        return { error: "Unable to reach the authentication service. Check your internet connection and try again." };
      }
    },
    async signUp(email, password, fullName, registrationNumber) {
      if (!supabase || !authIsConfigured) return { error: configurationError() };
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, registration_number: registrationNumber } },
        });
        if (error) return { error: error.message };
        return { needsEmailConfirmation: !data.session };
      } catch {
        return { error: "Unable to reach the authentication service. Please try again." };
      }
    },
    async resetPassword(email) {
      if (!supabase || !authIsConfigured) return { error: configurationError() };
      try {
        const redirectTo = `${window.location.origin}/reset-password`;
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
        return error ? { error: error.message } : {};
      } catch {
        return { error: "Unable to send the password reset email. Please try again." };
      }
    },
    async updatePassword(password) {
      if (!supabase || !authIsConfigured) return { error: configurationError() };
      try {
        const { error } = await supabase.auth.updateUser({ password });
        return error ? { error: error.message } : {};
      } catch {
        return { error: "Unable to update your password. Please request a new reset link." };
      }
    },
    async signOut() {
      if (supabase) await supabase.auth.signOut();
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
