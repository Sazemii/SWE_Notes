"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const hasInputValue = email.trim() !== "";
  const hasPasswordInputValue = password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      // Redirect to home page after successful login
      window.location.href = "/";
      // Alternatively, you could use next/navigation's useRouter if preferred.
    }
  };

  return (
    <div className="signupContent">
      <div className="appName Header">Panakbo</div>
      <div className="mainContent">
        <div className="signupCard">
          <h2 className="signupTitle">Login</h2>
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
              Login
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
        <div className="signupDesign"></div>
      </div>
    </div>
  );
}
