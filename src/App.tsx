// import { useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";
import "./App.css";
import logo from "./logo.svg";

function App() {
  // const client = useSuiClient();
  const enokiFlow = useEnokiFlow();

  // async function handleButtonClick() {
  //   // Get the keypair for the current user.
  //   const keypair = await enokiFlow.getKeypair();

  //   const txb = new Transaction();
  //   // Add some transactions to the block...

  //   // Sign and execute the transaction, using the Enoki keypair
  //   await client.signAndExecuteTransactionBlock({
  //     signer: keypair,
  //     transactionBlock: txb,
  //   });
  // }

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleSignIn}>Sign in with Google</button>
      </header>
    </div>
  );
}

export default App;
