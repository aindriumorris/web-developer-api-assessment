import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "@/app/globals.css";
import { MantineProvider } from "@mantine/core";

const oxanium = Oxanium({ weight: ["400"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MantineProvider>
      <html lang="en">
        <body className={` ${oxanium.className} `}>{children}</body>
      </html>
    </MantineProvider>
  );
}
