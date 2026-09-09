import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://toyhub.example"),
  title: {
    default: "ToyHub — Find Their Next Favorite Toy",
    template: "%s | ToyHub",
  },
  description:
    "Shop ToyHub for toys that inspire creativity, learning, and endless fun — building sets, STEM kits, dolls, outdoor toys, and more.",
  openGraph: {
    title: "ToyHub — Find Their Next Favorite Toy",
    description: "Discover toys that inspire creativity, learning, and endless fun.",
    siteName: "ToyHub",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <LocaleProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
