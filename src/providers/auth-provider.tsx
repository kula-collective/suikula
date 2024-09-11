// src/providers/auth-provider.tsx
"use client";

import { type ReactNode } from "react";

import { EnokiFlowProvider } from "@mysten/enoki/react";

// export type AuthApi = ReturnType<typeof createAuth>;

// export const AuthContext = createContext<AuthApi | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // const storeRef = useRef<AuthApi>();
  // if (!storeRef.current) {
  //   storeRef.current = createAuth();
  // }

  return (
    <EnokiFlowProvider apiKey={process.env.NEXT_PUBLIC_ENOKI_API_KEY!}>
      {children}
    </EnokiFlowProvider>
  );
};

// export const useAuth = <T,>(selector: (store: Auth) => T): T => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     throw new Error(`useAuth must be used within AuthProvider`);
//   }

//   return useStore(authContext, selector);
// };
