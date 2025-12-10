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
    <div
      className="h-screen w-screen bg-contain bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/91/42/c7/9142c7fd8851adb518be430d1f8c27b6.jpg)",
      }}
    >
      <div
        className="backdrop-blur-md bg-white/20 border border-white/70 shadow-2xl 
                      rounded-3xl p-10 w-[90%] max-w-sm flex flex-col gap-5"
      >
        <h2 className="text-black text-3xl font-serif text-center tracking-wide">
          Welcome Back
        </h2>
        {error && (
          <div
            className="text-sm text-red-500 text-center bg-red-500/10 
                  border border-red-500/20 rounded-lg py-2 px-3"
          >
            {error}
          </div>
        )}

        <form>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black my-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="p-3 w-full rounded-xl bg-white/40 border border-white/30 
                     text-black placeholder:text-black focus:outline-none"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black my-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="p-3 w-full rounded-xl bg-white/20 border border-white/30 
                     text-blac focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={signIn}
              disabled={loading}
              className="w-32 sm:w-40 mt-4 bg-white/30 backdrop-blur-sm text-black font-semibold 
               py-2.5 rounded-xl hover:bg-white/40 transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <button
              type="button"
              onClick={reset}
              disabled={loading}
              className="w-32 sm:w-40 mt-4 bg-white/30 backdrop-blur-sm text-black font-semibold 
               py-2.5 rounded-xl hover:bg-white/40 transition"
            >
              Reset
            </button>
          </div>
        </form>
        <p className=" text-center text-base text-black">
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
  );
};

export default Login;
