import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from "../components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VR Interiors | Commercial Interior Design",
    template: "%s | VR Interiors",
  },
  description:
    "VR Interiors creates thoughtful commercial interiors for offices, retail stores, showrooms and hospitality spaces. Start a conversation about your space.",
  applicationName: "VR Interiors",
  openGraph: {
    title: "VR Interiors | Commercial Interior Design",
    description: "Thoughtful commercial spaces designed around your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

<html lang="en" data-scroll-behavior="smooth"></html>;
