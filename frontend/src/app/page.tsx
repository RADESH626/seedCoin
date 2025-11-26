"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error connecting to backend: " + err.message));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Frontend Integration Test</h1>
        <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800">
          <p className="text-lg">Backend Status:</p>
          <p className="text-xl font-mono text-green-600 dark:text-green-400">{message}</p>
        </div>
      </main>
    </div>
  );
}
