"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ClientAuthGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run in browser; localStorage is available here.
    try {
      const raw = localStorage.getItem("userInfo");
      // If no user info and we're not already on the signin page, redirect.
      if (!raw && !pathname?.startsWith("/signin")) {
        // Use router.push for SPA navigation in Next.js app router.
        router.push('/signin');
      }
    } catch (err) {
      // If any error occurs (e.g. access denied), fall back to a hard redirect.
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/signin")) {
        window.location.href = "http://localhost:3000/signin";
      }
    }
  }, [router, pathname]);

  return null;
}
