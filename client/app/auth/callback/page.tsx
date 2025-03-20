"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.error("Auth error:", error);
        router.push("/login"); // Redirect to login if something goes wrong
        return;
      }

      // Extract userType from metadata
      const userType = data.user.user_metadata?.userType || "job-seeker";

      // Update global user state
      setUser(data.user);

      // Redirect to the onboarding page based on userType
      router.push(`/onboarding/${userType}`);
    };

    checkAuth();
  }, [router, setUser]);

  return <p>Verifying your email...</p>;
}
