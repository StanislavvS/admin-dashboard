import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Home() {
  const { data: session } = useSession();

  if (!session)
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-2 rounded-lg px-4"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg">
        Logged in {session.user.email}
      </div>
    </div>
  );
}
