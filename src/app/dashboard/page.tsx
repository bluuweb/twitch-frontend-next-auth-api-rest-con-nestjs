"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [cats, setCats] = useState([]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data = await res.json();
    setCats(data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button
        onClick={getCats}
        className="btn btn-primary"
      >
        Get Cats
      </button>
      <pre>
        <code>{JSON.stringify(cats, null, 2)}</code>
      </pre>
    </div>
  );
};
export default Dashboard;
