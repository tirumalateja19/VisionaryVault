import React, { useState } from "react";
import { auth, googleProvider } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const LoginDemo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  // const googleSignIn = async () => {
  //   try {
  //     await signInWithRedirect(auth, googleProvider);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const googleSignInPopup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.displayName);

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result?.user) {
  //         setUser(result.user);
  //         console.log("Google Sign-In Success:", result.user);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Redirect error:", err);
  //     });
  // }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>

        <div className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <button
            onClick={signIn}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </button>

          {/* <button
            onClick={googleSignIn}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sign In with Google
          </button> */}

          <button
            onClick={googleSignInPopup}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Sign In with Google popup
          </button>

          <button
            onClick={logOut}
            className="w-full py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Sign Out
          </button>
          {/* {user && (
            <div className="mt-3 text-sm">
              <p>Welcome, {user.displayName}</p>
              <p>Email: {user.email}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default LoginDemo;
