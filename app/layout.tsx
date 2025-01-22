"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LeftSideBar from "@/components/LeftSideBar";
import Topbar from "@/components/Topbar";
import BottomBar from "@/components/BottomBar";
import ConnectToUsers from "@/components/ConnectToUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Create a QueryClient instance
const queryClient = new QueryClient();

// export const metadata: Metadata = {
//   title: "BlogVerse",
//   description: "Share your Blogs Instantly",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <div className="flex flex-col md:flex-row">
              <Topbar />
              <LeftSideBar />
              <div className="grid w-full grid-cols-1 md:grid-cols-4 overflow-y-scroll" style={{scrollbarWidth:'none'}}>
                {/* Left section */}
                <div className="md:col-span-3 overflow-y-scroll" style={{scrollbarWidth:'none'}}>
                  {children}
                  </div>

                {/* Right section */}
                <div className="md:col-span-1">
                  <ConnectToUsers />
                </div>
              </div>

              <BottomBar />
            </div>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
