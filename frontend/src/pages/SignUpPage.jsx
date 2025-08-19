import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
  const { isPending, error, signupMutation } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">

        {/* Illustration */}
      

        {/* Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <ShipWheelIcon className="h-9 w-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {error && <div className="alert alert-error mb-4">{error.response?.data?.message || "Signup failed."}</div>}

          <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-xl font-semibold">Create an Account</h2>
            <p className="text-sm opacity-70">Join Streamify and start your language learning adventure!</p>

            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={signupData.fullName}
              onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />

            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" className="checkbox checkbox-sm" required />
              <span className="text-xs">I agree to the <span className="text-primary hover:underline">terms of service</span> and <span className="text-primary hover:underline">privacy policy</span></span>
            </label>

            <button className="btn btn-primary w-full" type="submit">
              {isPending ? <span className="loading loading-spinner loading-xs">Loading...</span> : "Create Account"}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
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

export default SignUpPage;
