import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signUp = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/body", { replace: true });
    } catch (err) {
      console.error(err);
      setError("auth/email-already-exists");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="h-screen w-screen bg-contain bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/91/42/c7/9142c7fd8851adb518be430d1f8c27b6.jpg)",
        }}
      >
        <div className="flex min-h-full flex-col justify-center w-full max-w-md">
          <div
            className="mt-10 w-full sm:w-[26vw] sm:h-[45vh] justify-center 
                    backdrop-blur-lg bg-white/20 border border-white/30 
                    rounded-xl p-8 shadow-2xl"
          >
            {error && (
              <div className="text-sm text-red-600 text-center bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
                {error}
              </div>
            )}
            <form className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mt-2"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="px-3 py-2 w-full rounded-md 
                         bg-white/40 border border-black/20
                         placeholder:text-black/60 text-black
                         focus:border-black focus:ring-2 focus:ring-black/30"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="px-3 py-2 w-full rounded-md 
                         bg-white/40 border border-black/20
                         placeholder:text-black/60 text-black
                         focus:border-black focus:ring-2 focus:ring-black/30"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div>
                <button
                  type="button"
                  onClick={signUp}
                  disabled={loading}
                  className="w-full py-2 bg-black/80 text-white rounded-lg 
                       hover:bg-black transition font-semibold"
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>

                <Link to="/">
                  <h1 className="text-lg text-center cursor-pointer hover:text-blue-700 font-semibold my-2 text-black">
                    Login
                  </h1>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
