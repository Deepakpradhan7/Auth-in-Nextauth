import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/SessionProvider";
// import AuthProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication | NextAuth",
  description: "Authentication",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
       <AuthProvider session={session}>
        <div className="bg-fuchsia-100">
        <div className="mx-auto max-w-5xl  min-h-screen   ">
          <Navbar/>
        {children}
        </div>
        </div>
        </AuthProvider>
        </body>
    </html>
  );
}
