"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

export default function LoginPage() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    const response = await login(email, password);

    if (response.error) {
      setError(response.error.message);
    }
    setLoading(false);
  };
  return <div>Login Page</div>;
}
