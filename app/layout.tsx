import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Quran Literacy Academy",
  description: "Online Qur'an learning for kids and adults worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <div className="pt-4">
          {children}
        </div>

      </body>
    </html>
  );
}
