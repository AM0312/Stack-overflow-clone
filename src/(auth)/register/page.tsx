"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

export default function RegisterPage() {
  const { createAccount, login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    const response = await createAccount(
      `${firstName} ${lastName}`,
      email,
      password
    );

    if (response.error) {
      setError(response.error.message);
    } else {
      const loginResponse = await login(email, password);
      if (loginResponse.error) {
        setError(loginResponse.error.message);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}
