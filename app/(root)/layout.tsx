import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
  
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata ={
  title : 'UniChat',
  description : 'A Next.js 14.2 Meta UniChat Application'
}

export default function RootsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
<ClerkProvider>
        <Topbar />

        <main className="flex flex-row">
          <LeftSidebar />

          <section className="main-container">

            <div className="w-full max-w-4xl">

            {children}

            </div>

          </section>

          <RightSidebar />

        </main>

        <Bottombar /> 
</ClerkProvider>
        </body>
    </html>
  );
}
