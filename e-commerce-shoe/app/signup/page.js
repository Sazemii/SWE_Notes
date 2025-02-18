"use client"; // Marks this as a client component
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // New hook for the App Router
import { signIn } from "next-auth/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const hasInputValue = email.trim() !== "";
  const hasPasswordInputValue = password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);

    if (res.ok) {
      // Automatically log in the user after signup
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setMessage(
          "Signup succeeded, but login failed. Please try logging in."
        );
      } else {
        router.push("/"); // Redirect to home page after successful signup and login
      }
    }
  };

  return (
    <div className="signupContent">
      <div className="appName Header">Panakbo</div>
      <div className="mainContent">
        <div className="signupCard">
          <h2 className="signupTitle">Signup</h2>
          <a className="signupGuest">
            If you don't want to have an account,
            <br /> You can login as a guest{" "}
            <span className="guestLink">here</span>.
          </a>
          <form onSubmit={handleSubmit} className="signupForm">
            <div className="inputContainer">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={hasInputValue ? "activeInput" : ""}
              />
              <span className={hasInputValue ? "active" : "input"}>Email</span>
              <div className="error"></div>
            </div>
            <div className="inputContainer">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={hasPasswordInputValue ? "activeInputPassword" : ""}
              />
              <span
                className={hasPasswordInputValue ? "activePassword" : "input"}
              >
                Password
              </span>
              <div className="error"></div>
            </div>
            <div className="queries">
              <div className="rememberForm">
                <input type="checkbox" className="checkbox" />
                <a className="remember">remember me</a>
              </div>
              <div className="forgotPasswordForm">
                <a className="forgotPassword">Forgot password?</a>
              </div>
            </div>
            <button type="submit" className="submit-signup">
              Sign Up
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
        <div className="signupDesign"></div>
      </div>

      <Image src="/images/my-emoji.png" alt="Logo" width={200} height={200} />
    </div>
  );
}
