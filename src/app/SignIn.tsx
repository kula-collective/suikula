import { useEnokiFlow } from "@mysten/enoki/react";

export default function SignIn() {
  const enokiFlow = useEnokiFlow();
  const handleSignIn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    // Set the redirect URL to the location that should
    // handle authorization callbacks in your app
    const redirectUrl = `${protocol}//${host}/auth`;

    enokiFlow
      .createAuthorizationURL({
        provider: "google",
        network: "testnet",
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        redirectUrl,
        extraParams: {
          scope: ["openid", "email", "profile"],
        },
      })
      .then((url) => {
        window.location.href = url;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}
