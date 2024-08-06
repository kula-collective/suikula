"use client";

import { useEnokiFlow } from "@mysten/enoki/react";

export default function LogoutButton() {
  const enokiFlow = useEnokiFlow();

  const handleClick = () => {
    enokiFlow.logout().then(() => {
      window.location.href = "/";
    });
  };

  return <button onClick={handleClick}>Logout</button>;
}
