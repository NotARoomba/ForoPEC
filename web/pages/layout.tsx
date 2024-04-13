import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/nav/NavBar";
import { AnimatePresence, motion } from "framer-motion";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foro PEC XVIII",
  description: "Website for the XVII Foro Pensando en Colombia 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <NavBar />{children}</body>
    </html>
  );
}
