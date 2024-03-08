import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Informer",
  description: "Stay ahead in gaming with the latest releases for all of gaming's trending and upcoming titles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <script
            defer
            src="https://kit.fontawesome.com/5f2bb09986.js"
            crossOrigin="anonymous"
          ></script>
        </head>

        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
