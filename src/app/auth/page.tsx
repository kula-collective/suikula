import { useAuthCallback } from "@mysten/enoki/react";
import { useEffect } from "react";

export default function Auth() {
  const { handled } = useAuthCallback();

  useEffect(() => {
    if (handled) {
      // Get access token, perform security checks,
      // manage user session, handle errors, and so on.
      window.location.href = "/";
    }
  }, [handled]);

  return <h1>Loading ...</h1>;
}
