import type { Metadata } from "next";
import Topbar from '@/components/Topbar'
import LeftSideBar from '@/components/LeftSideBar'


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
    <div className="flex flex-colmd:flex-row">
      <Topbar/>
      <LeftSideBar/>
      {children}
    </div>
  );
}
