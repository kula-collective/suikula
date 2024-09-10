"use client";

import { useEnokiFlow } from "@mysten/enoki/react";

export default function LogoutButton() {
  const enokiFlow = useEnokiFlow();

  const handleClick = () => {
    enokiFlow.logout().then(() => {
      window.location.href = "/";
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Logout
    </button>
  );
}
