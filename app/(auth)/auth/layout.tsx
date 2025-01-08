import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "BlogVerse | Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-3">
      <div className="col-span-1 md:col-span-1">{children}</div>
      <div className="col-span-1 h-full max-full md:col-span-2 flex flex-col items-center justify-center p-8 bg-black  text-white">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
            Welcome to <span className="text-blue-400">BlogVerse</span>
          </h1>
          <p className="text-lg max-w-2xl mb-4 leading-relaxed text-gray-300">
            Dive into a world of creativity and innovation! BlogVerse is your
            ultimate platform to share ideas, exchange stories, and build
            connections with a global audience.
          </p>
          <p className="text-md max-w-2xl mb-6 leading-relaxed text-gray-400">
            Whether you're an aspiring writer, an avid reader, or a curious
            soul, BlogVerse offers a seamless space to express yourself and get
            inspired by others.
          </p>
          <button className="bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out px-6 py-3 text-lg rounded-lg shadow-lg font-semibold">
            Join the Community
          </button>
        </div>
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why BlogVerse?</h2>
          <ul className="text-gray-300 space-y-3 list-disc list-inside">
            <li>Connect with like-minded individuals.</li>
            <li>Showcase your unique voice and perspectives.</li>
            <li>Explore trending topics and discover new insights.</li>
            <li>Engage in thoughtful discussions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
