import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Home Automation",
  description: "Control your smart home devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white py-4">
          <div className="container mx-auto text-center">
            © 2025 Smart Home Automation
            By Daniel Iyonagbe
          </div>
        </footer>
      </body>
    </html>
  );
}