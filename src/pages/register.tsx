"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/src/styles/register.css"; // ✅ Import the CSS file

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:8087/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const text = await response.text(); // Read response as text
      const result = text ? JSON.parse(text) : {}; // Parse JSON only if not empty

      if (!response.ok)
        throw new Error(result.message || "Registration failed");

      alert("Registration successful!"); // Optional success message
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <input
            {...register("firstName", { required: "First name is required" })}
            className="register-input"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="register-error">{errors.firstName.message}</p>
          )}

          <input
            {...register("lastName", { required: "Last name is required" })}
            className="register-input"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="register-error">{errors.lastName.message}</p>
          )}

          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="register-input"
            placeholder="Email"
          />
          {errors.email && (
            <p className="register-error">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="register-input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="register-error">{errors.password.message}</p>
          )}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
