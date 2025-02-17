// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import "@/src/styles/register.css"; // ✅ Import the CSS file

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         "http://localhost:8087/api/v1/auth/register",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       const result = await response.json().catch(() => ({})); // Safe JSON parsing

//       if (!response.ok)
//         throw new Error(result.message || "Registration failed");

//       alert(result.message); // ✅ Display the appropriate message
//       // router.push("/login");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-card">
//         <h2 className="register-title">Register</h2>
//         {error && <p className="register-error">{error}</p>}
//         <form onSubmit={handleSubmit(onSubmit)} className="register-form">
//           <input
//             {...register("firstName", { required: "First name is required" })}
//             className="register-input"
//             placeholder="First Name"
//           />
//           {errors.firstName && (
//             <p className="register-error">{errors.firstName.message}</p>
//           )}

//           <input
//             {...register("lastName", { required: "Last name is required" })}
//             className="register-input"
//             placeholder="Last Name"
//           />
//           {errors.lastName && (
//             <p className="register-error">{errors.lastName.message}</p>
//           )}

//           <input
//             {...register("email", { required: "Email is required" })}
//             type="email"
//             className="register-input"
//             placeholder="Email"
//           />
//           {errors.email && (
//             <p className="register-error">{errors.email.message}</p>
//           )}

//           <input
//             {...register("password", { required: "Password is required" })}
//             type="password"
//             className="register-input"
//             placeholder="Password"
//           />
//           {errors.password && (
//             <p className="register-error">{errors.password.message}</p>
//           )}

//           <button type="submit" className="register-button" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
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
  const [showLogin, setShowLogin] = useState(false); // ✅ State for login button
  const [email, setEmail] = useState(""); // ✅ Store the registered email
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setShowLogin(false);

    try {
      const response = await fetch("http://localhost:8087/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({})); // Safe JSON parsing

      if (!response.ok) throw new Error(result.message || "Registration failed");

      alert(result.message); // ✅ Display the response message

      if (result.message.includes("User already registered")) {
        setShowLogin(true); // ✅ Show login button
        setEmail(data.email); // ✅ Store the email for login
      } else {
        router.push("/login"); // ✅ Redirect to login if registration is successful
      }
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
          {errors.firstName && <p className="register-error">{errors.firstName.message}</p>}

          <input
            {...register("lastName", { required: "Last name is required" })}
            className="register-input"
            placeholder="Last Name"
          />
          {errors.lastName && <p className="register-error">{errors.lastName.message}</p>}

          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className="register-input"
            placeholder="Email"
          />
          {errors.email && <p className="register-error">{errors.email.message}</p>}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="register-input"
            placeholder="Password"
          />
          {errors.password && <p className="register-error">{errors.password.message}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {showLogin && (
          <div className="login-prompt">
            <p>Already registered? Log in with your email:</p>
            <button className="login-button" onClick={() => router.push(`/login?email=${email}`)}>
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
