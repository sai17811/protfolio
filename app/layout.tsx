import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sai | Senior MERN Developer",
    template: "%s | Sai"
  },
  description: "Senior MERN Developer specializing in React, Node.js, and MongoDB. Building scalable, high-performance web applications with precision.",
  keywords: ["MERN Developer", "Full Stack Developer", "React Developer", "Node.js", "MongoDB", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Sai" }],
  creator: "Sai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saidevv.com",
    title: "Sai | Senior MERN Developer",
    description: "Senior MERN Developer specializing in React, Node.js, and MongoDB.",
    siteName: "Sai Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sai Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai | Senior MERN Developer",
    description: "Senior MERN Developer specializing in React, Node.js, and MongoDB.",
    images: ["/og-image.png"],
    creator: "@saidevv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const Background3D = dynamic(() => import("@/components/Background3D").then((mod) => mod.Background3D), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sai",
    "url": "https://saidevv.com",
    "jobTitle": "Senior MERN Developer",
    "sameAs": [
      "https://github.com/sai1781"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* <Background3D /> */}
          {children}
          <Toaster position="top-center" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
