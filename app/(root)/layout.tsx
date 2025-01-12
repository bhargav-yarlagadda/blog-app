

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "BlogVerse | Home",
  description: "Share your Blogs Instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>{children}</div>
  );
}
