"use client"

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function Provider({ children }) {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      fetch("/api/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl,
        }),
      });
    }
  }, [user]);

  return <div>{children}</div>;
}

export default Provider;