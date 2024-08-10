import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find, Book, Meet",
  description:
    "This app help local individuals to connect and meet with each other, at local places",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} border grid shadow bg-gray-100 border-gray-200 m-2 bg-white  rounded-lg`}
      >
        <div className="bg-white h-[calc(100vh-4.2rem)]  flex rounded-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
