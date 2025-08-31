import React, { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const signIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/body", { replace: true });
    } catch (err) {
      console.error(err);
      setError("No account found / invalid-credential");
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setError(null);
    setEmail("");
    setPassword("");
  };
  // console.log(auth?.currentUser?.email);
  return (
    <div className="flex items-center justify-center bg-[#FAFAF9] min-h-screen px-4">
      <div className="flex min-h-full flex-col justify-center w-full max-w-md">
        {/* Heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-black">
            Log in to your account
          </h2>
        </div>

        {/* Card */}
        <div className="mt-10 w-full sm:max-w-md border border-gray-300 rounded-xl bg-gray-200 p-6 sm:p-8 shadow-lg">
          <form className="space-y-6">
            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-800"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="border-2 border-blue-500 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 px-3 py-2 w-full rounded-md"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-blue-800"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="border-2 border-blue-500 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 px-3 py-2 w-full rounded-md"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <button
                type="button"
                onClick={signIn}
                disabled={loading}
                className="w-full sm:w-1/2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={loading}
                className="w-full sm:w-1/2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-base text-gray-600">
            No Account?{" "}
            <Link
              to="signup"
              className="cursor-pointer hover:text-red-500 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
