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
      <body className={`w-screen overflow-x-hidden`}>
        <div className="bg-white h-screen w-screen md:h-[calc(100vh-4.2rem)]  flex rounded-lg">
          {children}
        </div>
      </body>
    </html>
  );
}
