import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { authIsConfigured, supabase } from "../lib/supabase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string; needsEmailConfirmation?: boolean }>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updatePassword: (password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Always send authentication emails back to the deployed application.
// This prevents confirmation/reset links from pointing to localhost when
// an account is created during local development or when the email is opened
// on another device.
const APP_URL = (import.meta.env.VITE_APP_URL as string | undefined)?.replace(/\/$/, "") || "https://mmust-hostelhub.vercel.app";

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
    async signUp(email, password, fullName) {
      if (!supabase || !authIsConfigured) return { error: configurationError() };
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${APP_URL}/login`,
          },
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
        const redirectTo = `${APP_URL}/reset-password`;
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
