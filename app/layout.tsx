import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Saidevv | Full-Stack Developer",
    template: "%s | Saidevv"
  },
  description: "Senior Frontend Developer specializing in React, Next.js, and TypeScript. Building scalable, high-performance web applications with pixel-perfect design.",
  keywords: ["Frontend Developer", "Full Stack Developer", "React Developer", "Next.js", "TypeScript", "Web Development", "Portfolio"],
  authors: [{ name: "Saidevv" }],
  creator: "Saidevv",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sai-portfolio.com",
    title: "Saidevv | Full-Stack Developer",
    description: "Senior Frontend Developer specializing in React, Next.js, and TypeScript.",
    siteName: "Saidevv Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saidevv Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saidevv | Full-Stack Developer",
    description: "Senior Frontend Developer specializing in React, Next.js, and TypeScript.",
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
    "name": "Saidevv",
    "url": "https://saidevv.com",
    "jobTitle": "Full-Stack Developer",
    "sameAs": [
      "https://github.com/saidevv"
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
          enableSystem
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
