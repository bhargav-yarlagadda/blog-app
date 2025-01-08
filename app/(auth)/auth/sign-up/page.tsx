"use client"
import React, { useState } from "react";
import Link from "next/link";
import { createUserAccount } from "@/appwrite/api";
import { INewUser } from "@/types";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    gmail: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e:any) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });

    // Reset error when user types again in the username field
    if (id === "username" && error) {
      setError("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    // Validate username
    if (formValues.username.trim() === "" || formValues.username.includes(" ")) {
      setError("Username cannot contain empty spaces.");
      return;
    }
  
    // Perform further actions like submitting the form
    const user: INewUser = {
      name: formValues.name,
      email: formValues.gmail,
      username: formValues.username,
      password: formValues.password,
    };
  
    const newUser = await createUserAccount({ user });
  
    if (typeof newUser === "string") {
      // If the result is an error message (string), set the error state
      setError("this combination of username and email already exists please choose different email or username");
    } else {
      console.log("New user:", newUser);
      // You can reset the error if needed
      setError(''); 
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-black shadow-lg rounded-lg p-8">
        <p className="text-4xl text-white w-full text-center font-bold">
          Blog<span className="text-blue-500">Verse</span>
        </p>
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formValues.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe123"
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          {/* Gmail Input */}
          <div>
            <label
              htmlFor="gmail"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Gmail
            </label>
            <input
              type="email"
              id="gmail"
              value={formValues.gmail}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
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
              value={formValues.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {/* Divider */}
        <div className="text-center my-4 text-gray-500">OR</div>
        {/* Footer */}
        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-blue-400 hover:text-blue-300 transition duration-300"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
