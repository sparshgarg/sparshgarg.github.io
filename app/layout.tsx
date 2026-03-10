import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "ProductGuru",
  description: "AI-powered PM interview practice studio"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
