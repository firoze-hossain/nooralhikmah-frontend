import { useState } from "react";
import { useRouter } from "next/router";
import "@/src/styles/activate.css";
const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [isOkay, setIsOkay] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Function to handle the account activation
  const confirmAccount = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:8087/api/v1/auth/activate-account?token=${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Token has expired or is invalid");
      }

      setMessage(
        "Your account has been successfully activated. You can now proceed to login."
      );
      setIsOkay(true);
    } catch (error) {
      setMessage(error.message);
      setIsOkay(false);
    } finally {
      setSubmitted(true);
    }
  };

  const handleCodeCompleted = (e) => {
    const token = e.target.value;
    if (token.length === 6) {
      confirmAccount(token);
    }
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="activation-container">
      {submitted ? (
        <div
          className={
            isOkay ? "activation-message success" : "activation-message error"
          }
        >
          <h2>{isOkay ? "Activation Successful" : "Activation Failed"}</h2>
          <p>{message}</p>
          <button
            className="btn"
            onClick={isOkay ? redirectToLogin : () => setSubmitted(false)}
          >
            {isOkay ? "Go to Login" : "Try Again"}
          </button>
        </div>
      ) : (
        <div className="activation-form">
          <h2>Enter Your Activation Code</h2>
          <input
            type="text"
            maxLength={6}
            className="activation-input"
            placeholder="Enter activation code"
            onBlur={handleCodeCompleted}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default ActivateAccount;
