import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ContextProvider } from "@/context/context";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";
import SearchBar from "@/components/searchBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuickNotes - Think. Write. Remember.",
  description: "Think. Write. Remember.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>
          <div className="min-h-screen max-w-screen flex flex-col sm:flex-row text-black">
            <Navbar />
            {children}
          </div>
          <Footer />
          <Toaster position="top-right" expand={true} richColors closeButton />
        </ContextProvider>
      </body>
    </html>
  );
}
