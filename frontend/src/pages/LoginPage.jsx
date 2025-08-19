import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

  

        {/* Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <ShipWheelIcon className="h-9 w-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {error && <div className="alert alert-error mb-4">{error.response?.data?.message}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-xl font-semibold">Welcome Back</h2>
            <p className="text-sm opacity-70">Sign in to your account to continue your language journey</p>

            <input
              type="email"
              placeholder="hello@example.com"
              className="input input-bordered w-full"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />

            <button className="btn btn-primary w-full" type="submit" disabled={isPending}>
              {isPending ? <span className="loading loading-spinner loading-xs">Signing in...</span> : "Sign In"}
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
            </p>
          </form>
        </div>
          <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center p-6">
          <div className="max-w-md text-center">
            <img src="/i.png" alt="Illustration" className="w-full h-full object-contain" />
            <h2 className="mt-6 text-xl font-semibold">Connect with language partners worldwide</h2>
            <p className="opacity-70 mt-2">Practice conversations, make friends, and improve your language skills together</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
