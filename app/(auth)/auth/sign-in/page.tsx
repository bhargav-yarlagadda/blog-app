import React from "react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black ">
      <div className="w-full max-w-md shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back to <br />
           <p className="text-cyan-400">BlogVerse</p>
        </h2>
        <form className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@domain.com"
              required
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between text-gray-300">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 bg-gray-700 border border-gray-600 rounded "
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm font-medium text-gray-300"
              >
                Remember Me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300 transition duration-300"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
          >
            Sign In
          </button>
        </form>
        {/* Divider */}
        <div className="text-center my-4 text-gray-500">OR</div>
        {/* Social Login */}
      
        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
