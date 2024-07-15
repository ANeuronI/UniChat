import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import { Inter } from "next/font/google";

import '../globals.css'; 

export const metadata ={
    title : 'UniChat',
    description : 'A Next.js 14.2 Meta UniChat Application'
}

const inter = Inter( {subsets : ["latin"]} )

export default function ROOTLayout({children }:{children : React.ReactNode}){
    return (
    <ClerkProvider>
      <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>
      <header className="head1-text">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <div className="w-full flex justify-center items-center min-h-screen">
              {children} 
          </div>
      </body>
      </html>  
        
    </ClerkProvider>)
}