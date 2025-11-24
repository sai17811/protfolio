import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sai Portfolio",
  description: "Frontend Developer with 3.6 years of experience in React.js, Redux Toolkit, TypeScript. Building scalable, high-performance web applications.",
};

const Background3D = dynamic(() => import("@/components/Background3D").then((mod) => mod.Background3D), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Background3D /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
