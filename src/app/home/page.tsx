import CreateKulaButton from "../components/create-kula-button";
import { Kulas } from "../components/kulas";
import LogoutButton from "../components/logout-button";
import Wallet from "../components/wallet";

export default function Home() {
  return (
    <>
      <h1>Kulas</h1>
      <Kulas />
      <CreateKulaButton />

      <div>
        <Wallet />
        <LogoutButton />
      </div>
    </>
  );
}
