import CreateKulaButton from "../components/create-kula-button";
import { Kulas } from "../components/kulas";
import LogoutButton from "../components/logout-button";

export default function Home() {
  return (
    <>
      <h1>Kulas</h1>
      <Kulas />
      <CreateKulaButton />

      <div>
        <LogoutButton />
      </div>
    </>
  );
}
