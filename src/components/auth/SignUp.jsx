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
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-black">
            Create new Account
          </h2>
        </div>

        <div className="mt-10 w-[23vw] h-[45vh] justify-center border border-gray-300 rounded-xl bg-gray-200 p-8 shadow-lg">
          {" "}
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-blue-800"
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
                  className="border-2 border-blue-500 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 px-3 py-1.5 w-full rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-blue-800"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="border-2 border-blue-500 focus:border-green-500 focus:ring-2 focus:ring-green-300 text-gray-700 px-3 py-1.5 w-full rounded-md"
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={signUp}
                disabled={loading}
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                {loading ? "creating account" : "Sign up"}
              </button>
              <Link to="/">
                <h1 className="text-lg text-center cursor-pointer hover:text-red-500 font-semibold mt-3">
                  Login
                </h1>
              </Link>
              {error && (
                <div className="text-sm text-red-600 mt-2 text-center">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
