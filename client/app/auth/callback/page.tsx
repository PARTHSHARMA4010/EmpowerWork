// client/app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { auth, db } from "@/lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth.currentUser) {
        console.error("Auth error: No user logged in");
        router.push("/login");
        return;
      }

      try {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        const userData = userDoc.data();

        // Extract userType from Firestore document
        const userType = userData?.userType || "job-seeker";

        // Update global user state (just in case it's not already set by AuthProvider)
        setUser(auth.currentUser);

        // Redirect to the onboarding page based on userType
        router.push(`/onboarding/${userType}`);
      } catch (error) {
        console.error("Error getting user data:", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router, setUser]);

  return <p>Verifying your email...</p>;
}