import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "@/components/buttons.component";
import { User } from "@/components/user.component";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
    const session = await getServerSession(authOptions);
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
      <div className="bg-blue-500 py-2 px-4 rounded text-white space-x-4 max-w-4xl">
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
      <div className="mt-4 border p-2 rounded text-wrap max-w-4xl overflow-scroll">
      <h1>Server Session</h1>
        <pre>{JSON.stringify(session, null,2)}</pre>
      <User />
      </div>
      </div>
    </main>
  );
}
