import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChange, signInWithGoogle, logOut, handleRedirectResult, type User } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Handle redirect result on page load
    const handleRedirect = async () => {
      try {
        const result = await handleRedirectResult();
        if (result?.user) {
          toast({
            title: "Welcome!",
            description: `Successfully signed in as ${result.user.displayName}`,
          });
        }
      } catch (error: any) {
        console.error("Redirect authentication error:", error);
        setError(error.message);
        toast({
          title: "Authentication Error",
          description: "Failed to complete sign in. Please try again.",
          variant: "destructive",
        });
      }
    };

    handleRedirect();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setIsLoading(false);
      setError(null);
    });

    return () => unsubscribe();
  }, [toast]);

  const signIn = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message);
      toast({
        title: "Sign In Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await logOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
      setError(error.message);
      toast({
        title: "Sign Out Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signOut,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}